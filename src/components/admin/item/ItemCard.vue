<template>
    <div class="item-card">
      <h3 class="item-name">{{ item.name }}</h3>
      <h3 class="item-description">{{ item.description }}</h3>
      <p class="stock">Stok: {{ item.stock }}</p>
      <div class="buttons">
        <button @click="$emit('edit-item', item)" class="edit">Edit</button>
        <button @click="$emit('delete-item', item.code)" class="delete">Delete</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ItemCard",
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .item-card {
    background: #ffffff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    transition: transform 0.2s ease-in-out;
  }
  
  .item-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .item-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
  }
  
  .item-description {
    font-size: 1rem;
    color: #606060;
    margin: 0 0 1rem 0;
  }
  
  .stock {
    font-size: 0.9rem;
    color: #666;
    margin: 0.5rem 0;
    padding: 0.25rem 0;
  }
  
  .buttons {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }
  
  .edit {
    background-color: #3498db;
    color: white;
  }
  
  .edit:hover {
    background-color: #2980b9;
  }
  
  .delete {
    background-color: #e74c3c;
    color: white;
  }
  
  .delete:hover {
    background-color: #c0392b;
  }
  </style>