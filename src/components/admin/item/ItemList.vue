<template>
  <div class="item-list">
    <div class="header">
      <h2>Daftar Barang</h2>
      <button class="add-btn" @click="showAddForm">Tambah Item</button>
    </div>
    <div class="item-cards">
      <ItemCard
        v-for="item in items"
        :key="item.code"
        :item="item"
        @edit-item="handleEdit"
        @delete-item="handleDelete"
      />
    </div>
    <Modal :visible="showForm" @close="cancelEditForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
import ItemCard from "./ItemCard.vue";
import Modal from '@/components/Modal.vue'; 
import ItemForm from "./ItemForm.vue";

export default {
  components: {
    ItemCard,
    Modal,
    ItemForm,
  },
  name: "ItemList",
  data() {
    return {
      items: [
        {
          code: "BRG001",
          name: "Laptop Asus ROG",
          description: "Laptop Gaming High Performance",
          stock: 10,
        },
        {
          code: "BRG002",
          name: "Mouse Gaming",
          description: "Mouse Wireless Gaming RGB",
          stock: 25,
        },
        {
          code: "BRG003",
          name: "Mechanical Keyboard",
          description: "Keyboard Mechanical Blue Switch",
          stock: 15,
        },
      ],
      showForm: false,
      selectedItem: null,
      isEdit: false,
    };
  },
  methods: {
    showAddForm() {
      this.selectedItem = {
        code: "",
        name: "",
        description: "",
        stock: "",
      };
      this.isEdit = false;
      this.showForm = true;
    },

    // Langsung gunakan sebagai handler untuk edit-item
    handleEdit(item) {
      this.selectedItem = { ...item }; // Buat shallow copy dari item
      this.isEdit = true;
      this.showForm = true;
    },

    handleSubmit(formData) {
      if (this.isEdit) {
        // Cari dan update item yang ada
        const index = this.items.findIndex(
          (item) => item.code === this.selectedItem.code
        );
        if (index !== -1) {
          // Gunakan Vue.set atau spread operator untuk memastikan reaktivitas
          this.items.splice(index, 1, { ...formData });
        }
      } else {
        // Tambah item baru
        this.items.push({ ...formData });
      }
      this.showForm = false;
      this.selectedItem = null;
      this.isEdit = false;
    },

    cancelEditForm() {
      this.showForm = false;
      this.selectedItem = null;
      this.isEdit = false;
    },

    handleDelete(code) {
      if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
        this.items = this.items.filter((item) => item.code !== code);
      }
    },
  },
};
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

.add-btn {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #4338ca;
}

.table-responsive {
  overflow-x: auto;
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
  text-align: center;
  width: 200px;
}

.edit-btn,
.delete-btn {
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  margin: 0 0.25rem;
  transition: all 0.2s;
}

.edit-btn {
  background-color: #10b981;
  color: white;
}

.edit-btn:hover {
  background-color: #059669;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.delete-btn:hover {
  background-color: #dc2626;
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

  .add-btn {
    width: 100%;
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

  .edit-btn,
  .delete-btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.813rem;
  }
}
</style>
