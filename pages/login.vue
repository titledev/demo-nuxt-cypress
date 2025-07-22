<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Welcome back! Please enter your credentials.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              :class="{ 'border-red-500': errors.email }"
              oninvalid="this.setCustomValidity('Email is required')"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="isLoading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            {{ isLoading ? "Signing in..." : "Sign in" }}
          </button>
        </div>

        <div
          v-if="loginError"
          class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md"
        >
          <p class="text-sm text-red-600">{{ loginError }}</p>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <NuxtLink
              to="/register"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Login",
  layout: "default",
});

const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const errors = ref({});
const isLoading = ref(false);
const loginError = ref("");

const validateForm = () => {
  errors.value = {};

  if (!form.value.email) {
    errors.value.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = "Please enter a valid email address";
  }

  if (!form.value.password) {
    errors.value.password = "Password is required";
  } else if (form.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
  }

  return Object.keys(errors.value).length === 0;
};

const handleLogin = async () => {
  loginError.value = "";

  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get users from localStorage
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    // Find user with matching email and password
    const user = registeredUsers.find(
      (user) =>
        user.email === form.value.email && user.password === form.value.password
    );

    if (user) {
      // Success - save login state and redirect to home
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: user.name,
          email: user.email,
        })
      );

      // Redirect to home page
      await navigateTo("/");
    } else {
      // Check if it's the demo user (for backward compatibility)
      if (
        form.value.email === "demo@example.com" &&
        form.value.password === "password123"
      ) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: "Demo User",
            email: "demo@example.com",
          })
        );
        await navigateTo("/");
      } else {
        loginError.value =
          "Invalid email or password. Please check your credentials or register a new account.";
      }
    }
  } catch (error) {
    loginError.value = "An error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Additional custom styles can be added here */
</style>
