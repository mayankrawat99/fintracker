import React, { useEffect, useState,useLayoutEffect } from "react";
import Header from "../Components/LandingPage/Header";
import Cards from "../Components/Cards/Cards";
import AddExpense from "../Components/Modals/AddExpense";
import AddIncome from "../Components/Modals/AddIncome";
import { addDoc, collection, getDocs, query, writeBatch } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Ttable from "../Components/TransactionsTable/Ttable";
import Loader from "../Components/Loader";
import NoTransactions from "../NoTransactions";
import ChartComponent from "../Components/Charts/ChartComponent";
import formatDate from '../assets/formatDate'

function Dashboard() {
  const[user]=useAuthState(auth)
  const [loading, setLoading] = useState(true)
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([])
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  function onFinish(values,type) {    
    const newTransaction = {
      type: type,
      date: (values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name.charAt(0).toUpperCase() + values.name.slice(1),}
      addTransaction(newTransaction)

      
    
  }
 async function addTransaction(transaction,many) {
  try {
    const docRef = await addDoc(collection(db,`user/${user.uid}/transactions`),transaction)
   if(!many) toast.success('Transaction Added!')
    setTransactions((oldtransactions)=>[...oldtransactions,transaction])
    calculateBalance();
  } catch (error) {
    console.error(error);
    if(!many)toast.error("Couldn't add transaction");
  }
    
  }
  function OpenIncomeModal() {
    setIsIncomeModalVisible(true);
  }
  function cancelIncomeModal() {
    setIsIncomeModalVisible(false);
  }
  function OpenExpenseModal() {
    setIsExpenseModalVisible(true);
  }
  function cancelExpenseModal() {
    setIsExpenseModalVisible(false);
  }
  async function fetchTransactions() {

    setLoading(true);
    if(user){
      const q = query(collection(db, `user/${user.uid}/transactions`));
      const snapshot = await getDocs(q);
      const transaction = snapshot.docs.map(doc =>({ id: doc.id, 
        ...doc.data()}));
      setTransactions(transaction);
      

    }
  setLoading(false)
  }
  useEffect(() => {
    if(user){
     fetchTransactions();
     toast.success("Transactions Fetched!")
    }
    
   },[user] )
  useEffect(() => {
    calculateBalance();
  },[transactions])
  function calculateBalance() {
    let totalInome =0
    let totalExpenses =0
    transactions.forEach(transaction => {
      if(transaction.type==='Expense'){
      totalExpenses+=transaction.amount
    }
    else if(transaction.type==='Income'){
      totalInome+=transaction.amount
    }
  })
    setCurrentBalance(totalInome-totalExpenses)
    setExpenses(totalExpenses)
    setIncome(totalInome)
  }
  let sortTransaction = [...transactions].sort((a, b) => {
    return new Date(formatDate(a.date)) - new Date(formatDate(b.date))
});


// Function to delete all transactions for a specific user
const deleteUserTransactions = async () => {
  try{
  const transactionsRef = collection(db, `user/${user.uid}/transactions`);
  const q = query(transactionsRef); // Optional: apply any filters if needed
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log('No transactions found for this user.');
    return;
  }

  // Create a batch to delete documents
  const batch = writeBatch(db); // Use writeBatch for batch operations

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Commit the batch delete
  await batch.commit();
  console.log('All transactions deleted successfully.');

} catch (error) {
  console.error('Error deleting transactions:', error);
}
};
 function deleteAll() {
  if(transactions.length!=0){
    deleteUserTransactions();
    setTransactions([]);
    setCurrentBalance(0);
    setExpenses(0);
    setIncome(0);
    toast.success("All Transactions deleted!")
    }
    else{
      toast.error("No Transactions to delete!")
    }
 }

  return (

    <>
      <Header />
      {loading ? <Loader/> :<> <Cards income={income} expenses={expenses} currentBalance={currentBalance}
        OpenExpenseModal={OpenExpenseModal}
        OpenIncomeModal={OpenIncomeModal}
        deleteAll={deleteAll}
      />
      {transactions.length!=0?<ChartComponent expenses={expenses} sortTransaction={sortTransaction}/>:<NoTransactions/>}
    <AddExpense cancelExpenseModal={cancelExpenseModal} isExpenseModalVisible={isExpenseModalVisible} onFinish={onFinish}/>

    <AddIncome cancelIncomeModal={cancelIncomeModal} isIncomeModalVisible={isIncomeModalVisible} onFinish={onFinish}/>
  <Ttable transactions={transactions} fetchTransactions={fetchTransactions} addTransaction={addTransaction}/></>}


    </>
  );
}

export default Dashboard;
