<template>
    <div>
      <h3>Фильтры</h3>
      <label>
        Категория:
        <select v-model="selectedCategory">
          <option value="">Все</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </label>
      <label>
        Дата:
        <input type="date" v-model="selectedDate" />
      </label>
      <button @click="applyFilters">Применить фильтры</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      categories: Array,
    },
    data() {
      return {
        selectedCategory: '',
        selectedDate: '',
      };
    },
    methods: {
      applyFilters() {
        this.$emit('filter', {
          category: this.selectedCategory,
          date: this.selectedDate,
        });
      },
    },
  };
  </script>
  