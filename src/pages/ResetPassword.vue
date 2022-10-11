<template>
  <div class="main-container">
    <div class="main container-sm">
      <img
        src="../assets/Setup-Wizard-pana.svg"
        alt="woman using her computer"
        class="img-box"
      />
      <div class="form-signup">
        <h2 class="mb-5 text-white">Forgot Password?</h2>
        <form class="w-75" @submit.prevent="handlePasswordReset()">
          <input
            id="email"
            type="email"
            autoComplete="email"
            v-model="email"
            placeholder="E-mail"
            required
            :pattern="Validator.EmailPattern"
          />
          <div class="d-grid">
            <button type="submit" class="btn btn-custom btn-lg btn-block mb-3">
              Send Reset Email
            </button>
          </div>
        </form>

        <div class="footer-signup pt-2">
          <button
            class="btn btn-link text-capitalize text-dark text-form mb-2"
            @click="$router.go(-1)"
          >
            Want to log in again? Go back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore, useAlertStore } from "../store/";
import ValidationConstants from "../utils/ValidationConstants";

const email = ref("");
const store = useUserStore();
const alertStore = useAlertStore();

const Validator = {
  EmailPattern: ValidationConstants.EMAIL_PATTERN,
};

// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
  try {
    await store.sendPasswordRestEmail(email.value);
    alertStore.success(`Password reset email sent to: ${email.value}`);
  } catch (error) {
    alertStore.error(error.message);
  }
};
</script>

<style scoped>
@import "../assets/auth.css";
</style>
