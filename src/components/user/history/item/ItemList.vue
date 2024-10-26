// src/components/user/item/ItemList.vue
<template>
  <div class="item-list">
    <h2>Daftar Barang</h2>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Kode Barang</th>
            <th>Nama Barang</th>
            <th>Deskripsi</th>
            <th>Stok</th>
            <th class="action-column">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in items" :key="item.code">
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.stock }}</td>
            <td class="action-buttons">
              <button
                class="borrow-btn"
                @click="borrowItem(item)"
                :disabled="item.stock === 0"
              >
                Pinjam
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :show="showForm" @close="cancelBorrowForm">
      <ItemForm
        :item="selectedItem"
        @submit="handleBorrow"
        @cancel="cancelBorrowForm"
      />
    </Modal>
  </div>
</template>

<script>
// Perbaiki path import sesuai struktur folder
import Modal from '@/components/Modal.vue'
import ItemForm from './ItemForm.vue'

export default {
  name: 'ItemList',
  components: {
    Modal,
    ItemForm
  },
  data() {
    return {
      items: [
        {
          code: 'BRG001',
          name: 'Laptop Asus ROG',
          description: 'Laptop Gaming High Performance',
          stock: 10
        },
        {
          code: 'BRG002',
          name: 'Mouse Gaming',
          description: 'Mouse Wireless Gaming RGB',
          stock: 25
        },
        {
          code: 'BRG003',
          name: 'Mechanical Keyboard',
          description: 'Keyboard Mechanical Blue Switch',
          stock: 15
        }
      ],
      showForm: false,
      selectedItem: null
    }
  },
  methods: {
    borrowItem(item) {
      this.selectedItem = { ...item }
      this.showForm = true
    },
    handleBorrow(item) {
      console.log('Borrow item:', item)
      // Implementasikan logika peminjaman barang di sini
      this.showForm = false
    },
    cancelBorrowForm() {
      this.showForm = false
      this.selectedItem = null
    }
  }
}
</script>

<style scoped>
.item-list {
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h2 {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.table-responsive {
  overflow-x: auto;
  background: linear-gradient(to right, white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(to right, rgba(255, 255, 255, 0), white 70%) 100% 0,
    radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 100% 0;
  background-repeat: no-repeat;
  background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-position: 0 0, 100% 0, 0 0, 100% 0;
  background-attachment: local, local, scroll, scroll;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.875rem;
}

thead {
  background-color: #f9fafb;
}

th {
  text-align: left;
  padding: 0.75rem 1rem;
  color: #4b5563;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
}

td {
  padding: 0.75rem 1rem;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
}

tr:hover {
  background-color: #f9fafb;
}

.action-column {
  width: 120px;
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.borrow-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.borrow-btn:hover {
  background-color: #45a049;
}

.borrow-btn:active {
  transform: scale(0.98);
}

.borrow-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .item-list {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header h2 {
    text-align: center;
  }

  table {
    font-size: 0.813rem;
  }

  th,
  td {
    padding: 0.625rem;
  }

  .action-column {
    width: auto;
  }

  .borrow-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.813rem;
  }
}
</style>