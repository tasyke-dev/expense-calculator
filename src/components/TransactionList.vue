<template>
    <div>
      <h2>Список транзакций</h2>
      <ul>
        <li v-for="transaction in filteredTransactions" :key="transaction.id">
          {{ transaction.date }} - {{ transaction.category }}: 
          <span :class="{ 'income': transaction.type === 'income', 'expense': transaction.type === 'expense' }">
            {{ transaction.type === 'income' ? '+' : '-' }}{{ transaction.amount }} 
          </span>
          ({{ transaction.description }})
          <button @click="deleteTransaction(transaction.id)">Удалить</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      transactions: {
        type: Array,
        required: true,
      },
      filters: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      filteredTransactions() {
        return this.transactions.filter(transaction => {
          const matchesCategory = !this.filters.category || transaction.category === this.filters.category;
          const matchesDate = !this.filters.date || transaction.date === this.filters.date;
          return matchesCategory && matchesDate;
        });
      }
    },
    methods: {
      editTransaction(transaction) {
        this.$emit('edit', transaction);
      },
      deleteTransaction(id) {
        this.$emit('delete', id);
      }
    }
  };
  </script>
  