<template>
    <form @submit.prevent="submitForm">
      <label>
        Дата:
        <input type="date" v-model="transaction.date" required />
      </label>
      <label>
        Категория:
        <input type="text" v-model="transaction.category" required />
      </label>
      <label>
        Тип:
        <select v-model="transaction.type" required>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </label>
      <label>
        Сумма:
        <input type="number" v-model="transaction.amount" required />
      </label>
      <label>
        Описание:
        <input type="text" v-model="transaction.description" />
      </label>
      <button type="submit">Добавить транзакцию</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        transaction: {
          date: '',
          category: '',
          type: 'income',
          amount: 0,
          description: '',
        },
      };
    },
    methods: {
      submitForm() {
        this.$emit('add-transaction', { ...this.transaction });
        this.transaction = { date: '', category: '', type: 'income', amount: 0, description: '' };
      },
    },
  };
  </script>
  