<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Join us today! Please fill in your details.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your full name"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email Address</label
            >
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Create a password"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your password"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="agree-terms"
            v-model="form.agreeTerms"
            name="agree-terms"
            type="checkbox"
            required
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
            I agree to the
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              >Terms of Service</a
            >
            and
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              >Privacy Policy</a
            >
          </label>
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
            {{ isLoading ? "Creating account..." : "Create account" }}
          </button>
        </div>

        <div
          v-if="registerError"
          class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md"
        >
          <p class="text-sm text-red-600">{{ registerError }}</p>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <NuxtLink
              to="/login"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Register",
  layout: "default",
});

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
});

const errors = ref({});
const isLoading = ref(false);
const registerError = ref("");

const validateForm = () => {
  errors.value = {};

  if (!form.value.name) {
    errors.value.name = "Name is required";
  } else if (form.value.name.length < 2) {
    errors.value.name = "Name must be at least 2 characters";
  }

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

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = "Please confirm your password";
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = "Passwords do not match";
  }

  if (!form.value.agreeTerms) {
    errors.value.agreeTerms = "You must agree to the terms and conditions";
  }

  return Object.keys(errors.value).length === 0;
};

const saveUserToLocalStorage = (userData) => {
  try {
    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    // Check if user already exists
    const userExists = existingUsers.some(
      (user) => user.email === userData.email
    );

    if (userExists) {
      throw new Error("An account with this email already exists");
    }

    // Add new user
    existingUsers.push(userData);

    // Save back to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    return true;
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
    return false;
  }
};

const handleRegister = async () => {
  registerError.value = "";

  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save user data to localStorage
    const userData = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };

    const saved = saveUserToLocalStorage(userData);

    if (saved) {
      // Success - redirect to login page
      await navigateTo("/login");
    } else {
      registerError.value = "Failed to create account. Please try again.";
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exists")) {
      registerError.value = error.message;
    } else {
      registerError.value = "An error occurred. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Additional custom styles can be added here */
.block {
  display: block;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.font-medium {
  font-weight: 500;
}
.text-gray-700 {
  color: #374151;
}
.mt-1 {
  margin-top: 0.25rem;
}
.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
