"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


 const serializeAmount = (obj) => ({
    ...obj,
    amount: obj.amount.toNumber(),
 })

export async function createTransaction(data) {
    try {
        const { userId }= await auth();
        if(!userId) throw new Error("Unauthorized");

        // Arcjet to add rate limiting

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

// Invalid `tx.transaction.create()` invocation in D:\study material\AI_Finance\finintel\.next\server\chunks\ssr\src_1a29f9._.js:493:57 490 const newBalance = account.balance.toNumber() + balanceChange; 491 // this transaction handle for prisma 492 const transaction = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{ → 493 const newTransaction = await tx.transaction.create({ data: { type: "EXPENSE", amount: 550, description: "Tuition Fees", date: new Date("2025-05-27T12:34:46.820Z"), accountId: "02e84da1-0cc9-4e7e-a763-e3376aadbdf7", category: "education", isRecurring: true, recurringInterval: "MONTHLY", userId: "d48d5107-d9b6-46f9-8509-ed4fab16c3f0", nextRecurringDate: new Date("Invalid Date") ~~~~~~~~~~~~~~~~~~~~~~~~ } }) Invalid value for argument `nextRecurringDate`: Provided Date object is invalid. Expected Date.