<script setup lang="ts">
import Snackbar from "@/components/Snackbar.vue";
import { apiBack } from "@/config/axios";
import notifyError from "@/helpers/notifyError";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showPassword = ref(false);
const state = reactive({
  password: "",
  email: "",
});
const setError = reactive({
  email: "",
  password: "",
});

// performing form input validations to make the call for submission
function validateForm() {
  if (!state.email) {
    setError.email = "E-mail obrigatório";
  } else {
    setError.email = "";
  }

  if (!state.password) {
    setError.password = "Senha obrigatória";
  } else {
    setError.password = "";
  }

  onSubmit();
}

// submitting the form
async function onSubmit() {
  try {
    const { data } = await apiBack.post("/signIn", state);

    localStorage.setItem("token", data.token);

    router.push({ name: "home" });
  } catch (error) {
    notifyError(error);
  }
}

onMounted(() => {
  localStorage.clear();
});
</script>

<template>
  <div class="container-sign-in">
    <!-- A+ logo -->
    <div class="sign-in-logo">
      <img
        src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg"
        alt=""
      />
    </div>

    <div class="sign-in-form">
      <form @submit.prevent="validateForm">
        <input
          class="sign-in-form-email"
          type="email"
          v-model="state.email"
          placeholder="E-mail"
        />
        <span v-if="setError.email" class="sign-in-set-error">
          {{ setError.email }}
        </span>
        <div class="sign-in-form-password">
          <input
            v-model="state.password"
            required
            placeholder="Senha"
            :type="showPassword ? 'text' : 'password'"
            style="font-size: 16px"
          />

          <!-- eye icons that when clicked will display the password or deprivation -->
          <i
            id="sign-in-form-password-eye"
            class="pi pi-eye"
            style="font-size: 1rem"
            v-if="!showPassword"
            @click="showPassword = !showPassword"
          />
          <i
            id="sign-in-form-password-eye"
            class="pi pi-eye-slash"
            style="font-size: 1rem"
            v-else
            @click="showPassword = !showPassword"
          />
        </div>
        <span v-if="setError.password" class="sign-in-set-error">{{
          setError.password
        }}</span>

        <v-btn type="submit" class="form-button" color="#ff203b">
          Entrar
        </v-btn>
        <Snackbar />
      </form>
    </div>
  </div>
</template>

<style scoped>
.container-sign-in {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  background-color: white;
}
.sign-in-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
}
.sign-in-logo img {
  width: 20rem;
  object-fit: contain;
}
.sign-in-form {
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 10px;
}
.sign-in-form form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  max-width: 50rem;
}
.sign-in-form input {
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  background-color: transparent;
  border: none;
  outline: none;
  color: #000;
  border-bottom: 1px solid #00000044;
}

.sign-in-form-email,
.sign-in-form-email::placeholder {
  font-size: 1rem;
}

.sign-in-form-password {
  position: relative;
}

#sign-in-form-password-eye {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 5rem;
}
.form-button {
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  background-color: #ff203b;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
}
.sign-in-set-error {
  color: red;
  font-size: 0.7rem;
}
</style>
