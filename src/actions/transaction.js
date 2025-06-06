"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

 const serializeAmount = (obj) => ({
    ...obj,
    amount: obj.amount.toNumber(), // amount type convert to number
 })

export async function createTransaction(data) {
    try {
        const { userId }= await auth();
        if(!userId) throw new Error("Unauthorized");

        // Arcjet to add rate limiting
        const req = await request();

        // Check rate limit
        const decision = await aj.protect(req, {
          userId,
          requested: 1, // Specify how many tokens to consume
        });

        if (decision.isDenied()) {
          if (decision.reason.isRateLimit()) {
            const { remaining, reset } = decision.reason;
            console.error({
              code: "RATE_LIMIT_EXCEEDED",
              details: {
                remaining,
                resetInSeconds: reset,
              },
            });

            throw new Error("Too many requests. Please try again later.");
          }

          throw new Error("Request blocked");
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if(!user) {
            throw new Error("User not found");
        }

        const account = await db.account.findUnique({
            where: {
                id: data.accountId,
                userId: user.id,
            },
        });

        if(!account) {
            throw new Error("Account not found"); 
        }

        const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
        const newBalance = account.balance.toNumber() + balanceChange;

        // this transaction handle for prisma
        const transaction =  await db.$transaction(async (tx) => {
            const newTransaction = await tx.transaction.create({
                data: {
                    ...data,
                    userId: user.id,
                    nextRecurringDate: 
                      data.isRecurring && data.recurringInterval
                        ? calculateNextRecurringDate(data.date, data.recurringInterval)
                        : null,
                },
            });

            await tx.account.update({
                where: { id: data.accountId },
                data: { balance: newBalance }
            });

            return newTransaction;
        });

        revalidatePath("/dashboard");
        revalidatePath(`/account/${transaction.accountId}`);

        return { success: true, data: serializeAmount(transaction) };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Helper function to calculate next recurring date
function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1);
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  return date;
}

export async function scanRecipt(file) {

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Convert ArrayBuffer to Base64
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    // that's prompt use for model's instruction
    const prompt = `Analyze this receipt image and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in ISO format)
      - Description or items purchased (brief summary)
      - Merchant/store name
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense )
      
      Only respond with valid JSON in this exact format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string",
        "category": "string"
      }

      If its not a recipt, return an empty object`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();


    try {
      const data = JSON.parse(cleanedText);
      return {
        amount: parseFloat(data.amount),
        date: new Date(data.date),
        description: data.description,
        category: data.category,
        merchantName: data.merchantName,
      };
    } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Invalid response format from Gemini"); 
    }
     
  } catch (error) {
      console.error("Error scanning receipt:", error);
      throw new Error("Failed to scan receipt");
  }
}

// 1. Before Editing transaction , we want to fetch previous Data
export async function getTransaction(id) {
  const { userId } = await auth();
  if(!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId }
  });

  if(!user) throw new Error("User not Found");

  const transaction = await db.transaction.findUnique({
    where: {
      id,
      userId: user.id
    }
  });

  if(!transaction) throw new Error("Transaction not found");

  return serializeAmount(transaction);
}

// 2. After fetch,we want to Edit(Update) some data
export async function updateTransaction(id, data) {
  try {
    const { userId } = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId }
    });

    if(!user) throw new Error("User not Found");


    // Get original transaction to calculate balance change
    const originalTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        account: true,
      },
    });

    if (!originalTransaction) throw new Error("Transaction not found");

    // Calculate balance changes
    const oldBalanceChange =
      originalTransaction.type === "EXPENSE"
        ? -originalTransaction.amount.toNumber()
        : originalTransaction.amount.toNumber();

    const newBalanceChange =
      data.type === "EXPENSE" ? -data.amount : data.amount;

    const netBalanceChange = newBalanceChange - oldBalanceChange;

    // Update transaction and account balance in a transaction
    const transaction = await db.$transaction(async (tx) => {
      const updated = await tx.transaction.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          ...data,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(data.date, data.recurringInterval)
              : null,
        },
      });

      // Update account balance
        await tx.account.update({
          where: { id: data.accountId },
          data: {
            balance: {
              increment: netBalanceChange,
            },
          },
        });

       return updated;
    });  

    revalidatePath("/dashboard");
    revalidatePath(`/account/${data.accountId}`);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    throw new Error(error.message);
  }
}


// Invalid `tx.transaction.create()` invocation in D:\study material\AI_Finance\finintel\.next\server\chunks\ssr\src_1a29f9._.js:493:57 490 const newBalance = account.balance.toNumber() + balanceChange; 491 // this transaction handle for prisma 492 const transaction = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{ → 493 const newTransaction = await tx.transaction.create({ data: { type: "EXPENSE", amount: 550, description: "Tuition Fees", date: new Date("2025-05-27T12:34:46.820Z"), accountId: "02e84da1-0cc9-4e7e-a763-e3376aadbdf7", category: "education", isRecurring: true, recurringInterval: "MONTHLY", userId: "d48d5107-d9b6-46f9-8509-ed4fab16c3f0", nextRecurringDate: new Date("Invalid Date") ~~~~~~~~~~~~~~~~~~~~~~~~ } }) Invalid value for argument `nextRecurringDate`: Provided Date object is invalid. Expected Date.


// Invalid `__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].transaction.findUnique()` invocation in D:\study material\AI_Finance\finintel\.next\server\chunks\ssr\[root-of-the-server]__e566481c._.js:573:178 570 }); 571 if (!user) throw new Error("User not Found"); 572 // Get original transaction to calculate balance change → 573 const originalTransaction = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].transaction.findUnique({ where: { id: { type: "EXPENSE", amount: 730, description: "Sunglassefv", date: new Date("2025-05-28T14:39:27.077Z"), accountId: "02e84da1-0cc9-4e7e-a763-e3376aadbdf7", category: "shopping", isRecurring: false }, ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ userId: "d48d5107-d9b6-46f9-8509-ed4fab16c3f0" }, include: { account: true } }) Argument `id`: Invalid value provided. Expected String, provided Object.