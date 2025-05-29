import { getUserAccounts } from '@/actions/dashboard'
import { defaultCategories } from '@/data/categories';
import AddTransactionForm from '../_components/transaction-form';
import { getTransaction } from '@/actions/transaction';
import React from 'react'

const AddTransactionPage = async({ searchParams }) => {
  const accounts = await getUserAccounts();
  const { edit } = await searchParams // searchParams should be apply await in new next.js
  const editId = edit;
  

  // console.log(editId);
  
  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className='max-w-3xl mx-auto px-6 py-5 rounded-xl '>
      <h1 className='text-5xl gradient-title mb-8'>
        {editId ? "Edit" : "Add"} Transaction
      </h1>
      <AddTransactionForm
       accounts={accounts}
       categories={defaultCategories}
       editMode={!!editId}
       initialData={initialData}
       />
    </div>
  )
}

export default AddTransactionPage



// Invalid `__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].transaction.findUnique()` invocation in D:\study material\AI_Finance\finintel\.next\server\chunks\ssr\[root-of-the-server]__e566481c._.js:568:178 565 }); 566 if (!user) throw new Error("User not Found"); 567 // Get original transaction to calculate balance change → 568 const originalTransaction = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].transaction.findUnique({ where: { id: { type: "EXPENSE", amount: 1730, description: "Sunglasse, Clothes", date: new Date("2025-05-28T14:39:27.077Z"), accountId: "02e84da1-0cc9-4e7e-a763-e3376aadbdf7", category: "shopping", isRecurring: false }, ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ userId: "d48d5107-d9b6-46f9-8509-ed4fab16c3f0" }, include: { account: true } }) Argument `id`: Invalid value provided. Expected String, provided Object