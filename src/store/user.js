import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useAlertStore } from "./alert";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null,
  },
  actions: {
    fetchUser() {
      const user = supabase.auth.user();
      this.user = user;
    },
    async signUp(credentials) {
      const { error } = await supabase.auth.signUp(credentials);
      if (error) {
        throw error;
      } else {
        useAlertStore().success(
          `Confirm your email to finishing registering: ${email.value}`
        );
      }
    },
    async singIn(credentials) {
      const { user, error } = await supabase.auth.signIn(credentials);
      if (error) throw error;
      this.user = user;
    },
    async sendPasswordRestEmail(email) {
      const { user, error } = await supabase.auth.api.resetPasswordForEmail(
        email,
        {
          redirectTo: "https://example.com/update-password",
        }
      );
      if (error) throw error;
      return user;
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
