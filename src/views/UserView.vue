// src/views/UserView.vue
<script>
import ItemList from '@/components/user/history/item/ItemList.vue'  // Sesuaikan dengan struktur folder Anda
import TransactionList from '@/components/user/history/transaction/TransactionList.vue'  // Sesuaikan dengan struktur folder Anda
import HistoryList from '@/components/user/history/HistoryList.vue'

export default {
  name: 'UserView',
  components: {
    ItemList,
    TransactionList,
    HistoryList
  },
  props: {
    currentComponent: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="user-view">
    <!-- Tampilan Item -->
    <div v-if="currentComponent === 'items'">
      <div class="component-container">
        <ItemList />
      </div>
    </div>

    <!-- Transaksi -->
    <div v-if="currentComponent === 'transactions'">
      <div class="component-container">
        <TransactionList />
      </div>
    </div>

    <!-- Riwayat -->
    <div v-if="currentComponent === 'history'">
      <div class="component-container">
        <HistoryList />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-view {
  width: 100%;
  padding: 20px;
  margin-top: 60px; /* Space for header */
  margin-left: 240px; /* Space for sidebar */
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
}

.component-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
}

@media (max-width: 576px) {
  .user-view {
    margin-left: 0; /* Remove sidebar margin on mobile */
    padding: 15px;
  }

  .component-container {
    padding: 15px;
  }
}
</style>