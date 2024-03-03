<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 shadow-md rounded-md w-96">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-sm text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/message-list");
      } catch (error) {
        console.error("Login failed:", error);
        alert(error.response.data.message);
      }
    },
  },
};
</script>
