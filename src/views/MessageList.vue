<template>
  <div class="bg-gray-50">
    <div class="bg-white p-4 shadow-md flex justify-between items-center">
      <h1 class="text-xl font-bold">Time Capsule</h1>
      <button
        @click="logout"
        class="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
    <div
      class="bg-white p-8 shadow-md rounded-md max-w-3xl mx-auto mt-8 flex justify-between"
    >
      <h2 class="text-2xl font-bold mb-4">Message List</h2>
      <router-link
        to="/add-message"
        class="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Message
      </router-link>
    </div>
    <div class="bg-white p-8 shadow-md rounded-md max-w-3xl mx-auto mt-8">
      <div v-for="message in messages" :key="message.id" class="mb-8">
        <div class="text-lg font-semibold mb-2">
          {{ message.note }}
        </div>
        <div class="text-sm text-gray-500 mb-2">
          {{ formatTime(message.scheduled_opening_time) }} | Time Left:
          {{ calculateTimeRemaining(message.scheduled_opening_time) }}
        </div>
        <div v-if="message.is_opened">
          <span class="text-green-500 font-semibold">Opened</span>
        </div>
        <div v-else>
          <button
            v-if="shouldShowButton(message.scheduled_opening_time)"
            @click="openMessage(message.id)"
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Open Message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    formatTime(time) {
      return new Date(time).toLocaleString();
    },
    async openMessage(messageId) {
      await this.$store.dispatch("updateMessageStatus", messageId);
    },
    calculateTimeRemaining(scheduledOpeningTime) {
      const currentTime = new Date().getTime();
      const openingTime = new Date(scheduledOpeningTime).getTime();
      let timeDifference = openingTime - currentTime;
      console.log(
        "🚀 ~ calculateTimeRemaining ~ timeDifference:",
        timeDifference
      );

      if (timeDifference <= 0) {
        return "00:00:00";
      }

      timeDifference = Math.floor(timeDifference / 1000);

      const hours = Math.floor(timeDifference / 3600);
      const minutes = Math.floor((timeDifference % 3600) / 60);
      const seconds = timeDifference % 60;

      const formattedTime =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

      return formattedTime;
    },
    shouldShowButton(scheduledOpeningTime) {
      const timeRemaining = this.calculateTimeRemaining(scheduledOpeningTime);
      if (timeRemaining === "00:00:00") {
        return true;
      } else false;
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
  computed: {
    ...mapState(["messages"]),
  },

  created() {
    this.$store.dispatch("getAllMessages");
  },
};
</script>
