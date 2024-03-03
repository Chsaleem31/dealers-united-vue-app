import { createStore } from "vuex";
import axios from "@/axiosInstance";
import Cookies from "vue-cookies";

export default createStore({
  state: {
    user: null,
    messages: [],
    isLoading: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    updateMessageStatus(state, message) {
      const messageIndex = state.messages.findIndex(
        (msg) => msg.id === message.id
      );
      if (messageIndex !== -1) {
        state.messages[messageIndex] = message;
      }
    },
    toggleLoader(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    async signup({ commit }, userData) {
      try {
        commit("toggleLoader", true);
        const response = await axios.post("register", userData);
        commit("setUser", response.data.user);
      } catch (error) {
        console.error("Error during signup:", error);
        throw error;
      } finally {
        commit("toggleLoader", false);
      }
    },
    async login({ commit }, credentials) {
      try {
        commit("toggleLoader", true);
        const response = await axios.post("login", credentials);
        commit("setUser", response.data.user);
        Cookies.set("auth_token", response.data.token);
        Cookies.set("user_id", response.data.user.id);
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      } finally {
        commit("toggleLoader", false);
      }
    },
    async createMessage({ commit }, messageData) {
      try {
        commit("toggleLoader", true);
        const userId = Cookies.get("user_id");
        await axios.post(`users/${userId}/message-capsules `, messageData);
      } catch (error) {
        console.error("Error during message creation:", error);
        throw error;
      } finally {
        commit("toggleLoader", false);
      }
    },
    async getAllMessages({ commit }) {
      try {
        commit("toggleLoader", true);
        const userId = Cookies.get("user_id");
        const response = await axios.get(`users/${userId}/message-capsules`);
        commit("setMessages", response.data.data);
        console.log("🚀 ~ getAllMessages ~ response:", response);
      } catch (error) {
        console.error("Error fetching all messages:", error);
        throw error;
      } finally {
        commit("toggleLoader", false);
      }
    },
    async updateMessageStatus({ commit }, messageId) {
      try {
        commit("toggleLoader", true);
        const userId = Cookies.get("user_id");
        const response = await axios.put(
          `users/${userId}/message-capsules/${messageId}/open`
        );
        commit("updateMessageStatus", response.data);
      } catch (error) {
        console.error("Error updating message status:", error);
        throw error;
      } finally {
        commit("toggleLoader", false);
      }
    },
    async logout({ commit }) {
      try {
        commit("toggleLoader", true);
        commit("setMessages", []);
        commit("setUser", null);
        Cookies.set("auth_token", null);
        Cookies.set("user_id", null);
      } catch (error) {
        console.error("Error updating message status:", error);
        throw error;
      } finally {
        commit("toggleLoader", false);
      }
    },
  },
  modules: {
    // Your modules go here
  },
});
