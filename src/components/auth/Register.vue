<template>
    <div class="register-form">
        <h2 class="h4 fw-bold mb-3 text-custom">Register</h2>

        <form @submit.prevent="register">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                    type="text"
                    id="username"
                    v-model="username"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="confirm-password" class="form-label"
                    >Confirm Password</label
                >
                <input
                    type="password"
                    id="confirm-password"
                    v-model="confirmPassword"
                    class="form-control"
                    required
                />
            </div>

            <button type="submit" class="btn btn-success w-100">
                Register
            </button>
        </form>

        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

        <div class="mt-3 text-center">
            <p class="text-muted">
                Already have an account?

                <a
                    href="#"
                    @click.prevent="$emit('switch', 'Login')"
                    class="text-custom"
                >
                    Login here
                </a>
            </p>
        </div>
    </div>
</template>

<script>
import { register as registerService } from '@/services/authService'

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
        }
    },
    methods: {
        async register() {
            // Log data sebelum melakukan registrasi
            console.log('Registering with data:', {
                username: this.username,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            });

            // Validasi jika password dan konfirmasi password tidak cocok
            if (this.password !== this.confirmPassword) {
                alert('Passwords do not match!');
                console.log('Passwords do not match!');
                return;
            }

            try {
                // Log request sebelum mengirim ke server
                console.log('Sending registration request to server...');
                
                // Panggil service untuk register
                let response = await registerService(
                    this.username,
                    this.email,
                    this.password
                );

                // Log sukses dan beri notifikasi pengguna
                console.log('Registration successful:', response);
                alert('Registration successful!');

                // Alihkan ke halaman login
                this.$emit('switch', 'Login');
            } catch (error) {
                // Tangani error yang berasal dari respons server
                if (error.response) {
                    const serverError = error.response.data.message || 'Invalid request';
                    this.error = `Server Error: ${serverError}`;
                    console.error('Server Error:', this.error);
                } else if (error.request) {
                    // Tangani error yang disebabkan oleh kegagalan network
                    this.error = 'Network Error: Failed to communicate with the server';
                    console.error('Network Error:', this.error);
                } else {
                    // Tangani error lainnya (kode frontend, dll.)
                    this.error = `Unexpected Error: ${error.message}`;
                    console.error('Unexpected Error:', this.error);
                }

                // Log error untuk debugging
                console.error('Registration failed:', this.error);

                // Tampilkan notifikasi gagal kepada pengguna
                alert(this.error);
            }
        }
    }
}
</script>

<style scoped>
.text-custom {
    color: #4b3f6b;
}

.form-label {
    color: #000;
}
</style>
