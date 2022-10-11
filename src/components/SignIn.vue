<template>
  <h2 class="mb-5 text-white">Sign In</h2>
  <form class="w-75" @submit.prevent="handleSignin">
    <div>
      <input
        id="email"
        type="email"
        autoComplete="email"
        v-model="email"
        placeholder="E-mail"
        required
        :pattern="ValidationConstants.EMAIL_PATTERN"
      />
    </div>
    <div class="text-start">
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <i
        class="bi bi-eye-slash"
        id="togglePassword"
        @click="toggleSignInPassword"
      ></i>
    </div>

    <div class="d-grid">
      <button type="submit" class="btn btn-custom btn-lg btn-block mb-3">
        Sign in
      </button>
      <router-link to="/resetpassword" class="mb-5"
        >Forgot Password?</router-link
      >
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore, useAlertStore } from "../store/";
import { togglePassword } from "../utils/TogglePassword";
import ValidationConstants from "../utils/ValidationConstants";

export default {
  created() {
    this.ValidationConstants = ValidationConstants;
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const store = useUserStore();
    const alertStore = useAlertStore();

    const toggleSignInPassword = () => {
      const password = document.querySelector("#password");
      const icon = document.querySelector("#togglePassword");

      togglePassword(password, icon);
    };

    const handleSignin = async () => {
      try {
        // Use the Supabase provided method to handle the signin
        await store.singIn({
          email: email.value,
          password: password.value,
        });

        router.push("/");
      } catch (error) {
        alertStore.error(error.message);
      }
    };

    return {
      email,
      password,
      toggleSignInPassword,
      handleSignin,
    };
  },
};
</script>

<style scoped>
form i {
  margin-left: -30px;
  cursor: pointer;
}
</style>
