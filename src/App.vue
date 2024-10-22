<template>
  <div id="app">
    <h1>Калькулятор расходов и доходов</h1>
    <AddTransaction @add-transaction="addTransaction" />
    <FilterTransactions :categories="getCategories()" @filter="applyFilters" />
    <TransactionList :transactions="transactions" :filters="filters" @edit="editTransaction" @delete="deleteTransaction"/>
    <h2>Текущий баланс: {{ balance }}</h2>
  </div>
</template>

<script>
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import AddTransaction from './components/AddTransaction.vue';
import TransactionList from './components/TransactionList.vue';
import FilterTransactions from './components/FilterTransactions.vue';

export default {
  components: {
    AddTransaction,
    TransactionList,
    FilterTransactions,
  },
  data() {
    return {
      transactions: [],
      balance: 0,
      filters: {
        category: '',
        date: '',
      },
    };
  },
  methods: {
    getCategories() {
      return [...new Set(this.transactions.map(transaction => transaction.category))];
    },
    applyFilters(filters) {
      this.filters = filters;
    },
    async fetchTransactions() {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      this.transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.calculateBalance();
    },
    async addTransaction(transaction) {
      await addDoc(collection(db, 'transactions'), transaction);
      this.fetchTransactions();
    },
    async editTransaction(transaction) {
      const transactionDoc = doc(db, 'transactions', transaction.id);
      await updateDoc(transactionDoc, transaction);
      this.fetchTransactions();
    },
    async deleteTransaction(id) {
      const transactionDoc = doc(db, 'transactions', id);
      await deleteDoc(transactionDoc);
      this.fetchTransactions();
    },
    calculateBalance() {
      const totalIncome = this.transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
      const totalExpenses = this.transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
      this.balance = totalIncome - totalExpenses;
    },
  },
  mounted() {
    this.fetchTransactions();
  },
};
</script>
