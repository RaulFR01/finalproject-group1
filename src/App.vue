<template>
  <div class="background" :class="{ backgroundLog: isSignIn }">
    <Navbar :visible="state.isAuthenticated" />
    <div
      :class="{ cardBck: !isSignIn, cardErr: isErr }"
      style="
        width: 98%;
        margin: auto;
        border-top-left-radius: 2rem;
        border-top-right-radius: 2rem;
      "
    >
      <Alert />
      <router-view />
    </div>
  </div>
</template>

<script>
import { reactive, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
import { supabase } from "./supabase";
import { useUserStore } from "./store/user";
import { Alert, Navbar } from "./components/";

export default {
  components: {
    Alert,
    Navbar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useUserStore();

    const state = reactive({
      isAuthenticated: false,
    });

    const isResetPassword = () => {
      return route.path === "/resetpassword";
    };

    onUpdated(() => {
      store.user = supabase.auth.user();
      state.isAuthenticated = store.isAuthenticated;

      if (!state.isAuthenticated && !isResetPassword()) {
        router.push("/auth");
      }
    });

    return {
      state,
    };
  },
  computed: {
    isSignIn() {
      return (
        this.$route.path === "/auth" || this.$route.path === "/resetpassword"
      );
    },
    isErr() {
      return this.$route.path === "/404";
    },
  },
};
</script>

<style scoped>
.background {
  height: 100vh;
  width: 100vw;
}
.backgroundLog {
  background: linear-gradient(to bottom, #0f0c2b, #2f2a64, #272745);
  position: relative;
}
.backgroundLog:before {
  content: "";
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.1;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.cardBck {
  background-color: #fff;
  min-height: calc(100vh - 72px);
}

.cardErr {
  background-color: rgb(40, 69, 31);
  min-height: calc(100vh - 72px);
  width: 100vh;
  position: relative;
}
</style>
