<template>
  <div id="not-found-container">
    <div class="noise"></div>
    <div class="overlay"></div>
    <div class="terminal">
      <h1>Error <span class="errorcode">404</span></h1>
      <p class="output">
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
      <p class="output">
        Please try to <a href="#" @click="$router.go(-1)">go back</a> or
        <router-link to="/">return to the homepage</router-link>.
      </p>
      <p class="output">Good luck.</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Inconsolata";

#not-found-container {
  min-height: 100%;
}

#not-found-container {
  box-sizing: border-box;
  height: 100%;
  background-color: #000000;
  background-image: radial-gradient(#11581e, #041607), url("../assets/404.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 1.5rem;
  text-align: left;
}

#not-found-container * {
  font-family: "Inconsolata", Helvetica, sans-serif;
  text-shadow: 0 0 1ex rgba(51, 255, 51, 1), 0 0 2px rgba(255, 255, 255, 0.8);
}

.noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/404.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: 0.02;
}

.overlay {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: auto 4px;
  z-index: 1;
  border-radius: 32px 32px 0 0;
}

.overlay::before {
  content: "";
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    0deg,
    transparent 0%,
    rgba(32, 128, 32, 0.2) 2%,
    rgba(32, 128, 32, 0.8) 3%,
    rgba(32, 128, 32, 0.2) 3%,
    transparent 100%
  );
  background-repeat: no-repeat;
  animation: scan 7.5s linear 0s infinite;
}

@keyframes scan {
  0% {
    background-position: 0 -100vh;
  }
  35%,
  100% {
    background-position: 0 100vh;
  }
}

.terminal {
  box-sizing: inherit;
  position: absolute;
  height: 100%;
  width: 1000px;
  max-width: 100%;
  padding: 5rem;
  text-transform: uppercase;
}

.output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow: 0 0 1px rgba(51, 255, 51, 0.4), 0 0 2px rgba(255, 255, 255, 0.8);
}

.output::before {
  content: "> ";
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  color: rgba(128, 255, 128, 0.8);
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  color: #ccc;
}

a::before {
  content: "[";
}

a::after {
  content: "]";
}

.errorcode {
  color: white;
}
</style>