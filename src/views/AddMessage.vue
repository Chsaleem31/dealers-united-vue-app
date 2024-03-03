<template>
  <div class="bg-white p-4 shadow-md flex justify-between items-center">
    <h1 class="text-xl font-bold">Time Capsule</h1>
    <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-md">
      Logout
    </button>
  </div>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 shadow-md rounded-md w-96">
      <h2 class="text-2xl font-bold mb-4">Add Message</h2>
      <form @submit.prevent="addMessage">
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-600"
            >Message</label
          >
          <textarea
            id="message"
            v-model="message"
            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label
            for="openingTime"
            class="block text-sm font-medium text-gray-600"
            >Scheduled Opening Time</label
          >
          <input
            type="datetime-local"
            id="openingTime"
            v-model="openingTime"
            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Message
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      openingTime: "",
    };
  },
  methods: {
    async addMessage() {
      try {
        await this.$store.dispatch("createMessage", {
          note: this.message,
          scheduled_opening_time: this.openingTime,
        });
        this.$router.push("/message-list");
      } catch (error) {
        console.error("Error adding message:", error);
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error adding message:", error);
      }
    },
  },
};
</script>
