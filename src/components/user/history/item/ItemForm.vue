<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>Peminjaman Barang</h2>

      <div>
        <label for="kode">Kode Barang:</label>
        <input type="text" v-model="form.kode" id="kode" :disabled="true" />
      </div>

      <div>
        <label for="nama">Nama Produk:</label>
        <input type="text" v-model="form.nama" id="nama" :disabled="true" />
      </div>

      <div>
        <label for="deskripsi">Deskripsi:</label>
        <input
          type="text"
          v-model="form.deskripsi"
          id="deskripsi"
          :disabled="true"
        />
      </div>

      <div>
        <label for="tanggal_pinjam">Tanggal Pinjam:</label>
        <input type="date" v-model="form.tanggal_pinjam" id="tanggal_pinjam" />
      </div>

      <div>
        <label for="tanggal_kembali">Tanggal Kembali:</label>
        <input
          type="date"
          v-model="form.tanggal_kembali"
          id="tanggal_kembali"
        />
      </div>

      <div>
        <label for="jumlah_pinjam">Jumlah Pinjam:</label>
        <input type="number" v-model="form.jumlah_pinjam" id="jumlah_pinjam" />
      </div>

      <div class="button-container">
        <button type="button" @click="cancelForm">Batal</button>
        <button type="submit">Ajukan</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PeminjamanForm",

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        kode: this.item ? this.item.code : "",
        nama: this.item ? this.item.name : "",
        deskripsi: this.item ? this.item.description : "",
        tanggal_pinjam: "",
        tanggal_kembali: "",
        jumlah_pinjam: 1,
      },
    };
  },

  methods: {
    submitForm() {
      // Emit custom event 'submit' dengan payload data form
      this.$emit("submit", { ...this.form });
    },

    cancelForm() {
      // Emit custom event 'cancel' tanpa payload
      this.$emit("cancel");
    },
  },

  watch: {
    item(newItem) {
      if (newItem) {
        this.form.code = newItem.code;
        this.form.name = newItem.name;
        this.form.description = newItem.description;
      }
    },
  },
};
</script>

<style scoped>
.button-container {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
}

button[type="button"]:hover {
  background-color: #da190b;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}
</style>
