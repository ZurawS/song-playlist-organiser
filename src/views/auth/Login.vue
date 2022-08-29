<template>
  <form @submit.prevent="handleSubmit">
    <h3>Log in</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button :disabled="isPending">Log in</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log("User logged in");
        router.push({ name: "Home" });
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style></style>
