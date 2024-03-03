<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 shadow-md rounded-md w-96">
      <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-600"
            >First Name</label
          >
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-600"
            >Last Name</label
          >
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
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
        <div class="mb-4">
          <label
            for="passwordConfirmation"
            class="block text-sm font-medium text-gray-600"
            >Confirm Password</label
          >
          <input
            type="password"
            id="passwordConfirmation"
            v-model="passwordConfirmation"
            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>
      <p class="mt-4 text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  methods: {
    async signup() {
      try {
        await this.$store.dispatch("signup", {
          name: this.firstName + " " + this.lastName,
          email: this.email,
          password: this.password,
          password_confirmation: this.password,
        });

        this.$router.push("/login");
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errorMessage =
            error.response.data.message ||
            "Signup failed. Please check your inputs.";
          alert(errorMessage);
        } else {
          console.error("Error during signup:", error);
          alert("Signup failed. Please try again later.");
        }
      }
    },
  },
};
</script>
