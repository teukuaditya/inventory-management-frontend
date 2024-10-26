<template>
  <div class="user-list">
    <div class="header">
      <h2>Daftar Pengguna</h2>
      <button class="add-btn" @click="$emit('add-user')">
        Tambah Pengguna
      </button>
    </div>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th class="action-column">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td class="action-column">
              <button class="edit-btn" @click="$emit('edit-user', user)">Edit</button>
              <button class="delete-btn" @click="handleDelete(user.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      users: [
        { id: 1, username: "admin", email: "admin@example.com", role: "Admin" },
        { id: 2, username: "user", email: "user@example.com", role: "User" },
      ],
    };
  },
  methods: {
    handleDelete(id) {
      if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
        this.users = this.users.filter(user => user.id !== id);
        this.$emit('delete-user-success', id);
      }
    }
  },
};
</script>

<style scoped>
.user-list {
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

.edit-btn, .delete-btn {
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
  .user-list {
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

  .edit-btn, .delete-btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.813rem;
  }
}
</style>