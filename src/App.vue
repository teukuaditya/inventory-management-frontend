// App.vue
<template>
  <div id="app">
    <!-- Header Komponen -->
    <Header 
      :current-role="currentRole"
      :is-sidebar-visible="isSidebarVisible"
      @update-role="handleRoleUpdate"
      @toggle-sidebar="toggleSidebar"
    />
    
    <!-- Sidebar Komponen -->
    <Sidebar 
      :current-role="currentRole"
      :is-sidebar-visible="isSidebarVisible"
      @show-component="handleComponentChange"
    />

    <!-- Konten Utama -->
    <main :class="{ 'content-expanded': !isSidebarVisible }">
      <!-- Tampilkan AdminView jika role adalah admin -->
      <AdminView 
        v-if="currentRole === 'admin'"
        :current-component="currentComponent"
        :items="items"
        :show-item-form="showItemForm"
        :selected-item="selectedItem"
        @update:show-item-form="showItemForm = $event"
        @save-item="handleSaveItem"
        @edit-item="handleEditItem"
        @delete-item="handleDeleteItem"
      />
      
      <!-- Tampilkan UserView jika role adalah user -->
      <UserView
        v-if="currentRole === 'user'"
        :current-component="currentComponent"
        :items="items"
      />
    </main>

    <!-- Modal Notifikasi -->
    <Modal 
      v-if="showModal"
      :modal-content="modalContent"
      @close="closeModal"
    />
  </div>
</template>

<script>
import Header from '@/components/dashboard/Header.vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    AdminView,
    UserView,
    Modal
  },
  data() {
    return {
      currentRole: 'user', // Role default
      currentComponent: 'items', // Komponen default yang ditampilkan
      isSidebarVisible: true, // Status sidebar (tampil/sembunyi)
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
      showItemForm: false,
      selectedItem: null,
      showModal: false,
      modalContent: {
        title: '',
        message: '',
        type: ''
      }
    }
  },
  methods: {
    // Handler untuk pergantian role (admin/user)
    handleRoleUpdate(role) {
      this.currentRole = role
      // Reset ke komponen default berdasarkan role
      this.currentComponent = role === 'admin' ? 'users' : 'items'
      console.log('Role changed to:', role)
    },
    
    // Toggle sidebar (tampil/sembunyi)
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible
      console.log('Sidebar toggled:', this.isSidebarVisible)
    },
    
    // Handler untuk pergantian komponen yang ditampilkan
    handleComponentChange(component) {
      this.currentComponent = component
      this.showItemForm = false
      console.log('Component changed to:', component)
    },

    // Handler untuk menyimpan item
    handleSaveItem(item) {
      if (this.selectedItem) {
        // Edit item yang sudah ada
        const index = this.items.findIndex(i => i.code === item.code)
        if (index !== -1) {
          this.items.splice(index, 1, item)
          this.showNotification('Sukses', 'Item berhasil diperbarui', 'success')
        }
      } else {
        // Tambah item baru
        this.items.push(item)
        this.showNotification('Sukses', 'Item berhasil ditambahkan', 'success')
      }
      this.showItemForm = false
      this.selectedItem = null
    },

    // Handler untuk mengedit item
    handleEditItem(item) {
      this.selectedItem = { ...item }
      this.showItemForm = true
    },

    // Handler untuk menghapus item
    handleDeleteItem(code) {
      this.items = this.items.filter(item => item.code !== code)
      this.showNotification('Sukses', 'Item berhasil dihapus', 'success')
    },

    // Menampilkan notifikasi
    showNotification(title, message, type) {
      this.modalContent = { title, message, type }
      this.showModal = true
    },

    // Menutup modal
    closeModal() {
      this.showModal = false
      this.modalContent = { title: '', message: '', type: '' }
    }
  }
}
</script>

<style>
/* ... style tetap sama ... */
</style>