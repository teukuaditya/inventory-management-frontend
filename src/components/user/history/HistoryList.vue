<template>
  <div class="history-list">
    <h2>Riwayat Peminjaman</h2>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Barang</th>
            <th>Jumlah Pinjam</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Kembali</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="history in histories" :key="history.id">
            <td>{{ history.id }}</td>
            <td>{{ history.namaBarang }}</td>
            <td>{{ history.jumlahPinjam }}</td>
            <td>{{ formatDate(history.tanggalPinjam) }}</td>
            <td>{{ formatDate(history.tanggalKembali) }}</td>
            <td>
              <span :class="['status-badge', history.status.toLowerCase()]">
                {{ history.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryList",

  data() {
    return {
      histories: [
        {
          id: "1",
          namaBarang: "Laptop Asus ROG",
          jumlahPinjam: 1,
          tanggalPinjam: "2024-10-20",
          tanggalKembali: "2024-10-27",
          status: "DIPROSES"
        },
        {
          id: "2", 
          namaBarang: "Mouse Gaming",
          jumlahPinjam: 2,
          tanggalPinjam: "2024-10-21",
          tanggalKembali: "2024-10-28",
          status: "SELESAI"
        },
        {
          id: "3",
          namaBarang: "Mechanical Keyboard",
          jumlahPinjam: 1,
          tanggalPinjam: "2024-10-22",
          tanggalKembali: "2024-10-29", 
          status: "MENUNGGU"
        }
      ],
    };
  },

  methods: {
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    },
  },
};
</script>

<style scoped>
.history-list {
  padding: 1rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0; /* Menghilangkan margin auto */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem; /* Mengurangi margin bottom */
  padding: 0 0.5rem; /* Menambahkan sedikit padding horizontal */
}

.header h2 {
  color: #1f2937;
  font-size: 1.25rem; /* Sedikit mengurangi ukuran font */
  font-weight: 600;
  margin: 0;
}

.table-responsive {
  overflow-x: auto;
  background: linear-gradient(to right, white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(to right, rgba(255, 255, 255, 0), white 70%) 100% 0,
    radial-gradient(
      farthest-side at 0 50%,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      farthest-side at 100% 50%,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0)
    )
    100% 0;
  background-repeat: no-repeat;
  background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-position: 0 0, 100% 0, 0 0, 100% 0;
  background-attachment: local, local, scroll, scroll;
  margin: 0; /* Menghilangkan margin */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem; /* Mengurangi margin top */
  font-size: 0.875rem;
  background-color: white;
}

thead {
  background-color: #f9fafb;
}

th {
  text-align: left;
  padding: 0.625rem 0.75rem; /* Mengurangi padding */
  color: #4b5563;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

td {
  padding: 0.625rem 0.75rem; /* Mengurangi padding */
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
}

/* Status Badge Styles */
.status-badge {
  padding: 0.25rem 0.5rem; /* Mengurangi padding horizontal */
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
}

/* Status colors tetap sama */
.selesai {
  background-color: #d1fae5;
  color: #065f46;
}

.diproses {
  background-color: #fef3c7;
  color: #92400e;
}

.menunggu {
  background-color: #e0f2fe;
  color: #0369a1;
}

.dibatalkan {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Responsive styles */
@media (max-width: 768px) {
  .history-list {
    padding: 0.75rem;
  }
  
  .header {
    padding: 0 0.25rem;
  }
  
  th, td {
    padding: 0.5rem;
  }
  
  .status-badge {
    padding: 0.25rem 0.5rem;
  }
}
</style>
