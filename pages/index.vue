<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h1
          class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
        >
          Welcome to
          <span class="text-indigo-600">Demo App</span>
        </h1>

        <!-- Show user info if logged in -->
        <div v-if="currentUser" class="mt-4">
          <p class="text-xl text-gray-600">
            Welcome back,
            <span class="font-semibold text-indigo-600">{{
              currentUser.name
            }}</span
            >!
          </p>
          <p class="text-sm text-gray-500 mt-2">{{ currentUser.email }}</p>
          <button
            @click="handleLogout"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>

        <p
          v-else
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          A modern Nuxt.js application with authentication. Sign in to get
          started or create a new account.
        </p>

        <div
          v-if="!currentUser"
          class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
        >
          <div class="rounded-md shadow">
            <NuxtLink
              to="/login"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Sign In
            </NuxtLink>
          </div>
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <NuxtLink
              to="/register"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Sign Up
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="mt-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div class="pt-6">
            <div class="flow-root bg-white rounded-lg px-6 pb-8">
              <div class="-mt-6">
                <div>
                  <span
                    class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg"
                  >
                    <svg
                      class="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                </div>
                <h3
                  class="mt-8 text-lg font-medium text-gray-900 tracking-tight"
                >
                  Secure Authentication
                </h3>
                <p class="mt-5 text-base text-gray-500">
                  Built with modern security practices and form validation to
                  keep your data safe.
                </p>
              </div>
            </div>
          </div>

          <div class="pt-6">
            <div class="flow-root bg-white rounded-lg px-6 pb-8">
              <div class="-mt-6">
                <div>
                  <span
                    class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg"
                  >
                    <svg
                      class="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                </div>
                <h3
                  class="mt-8 text-lg font-medium text-gray-900 tracking-tight"
                >
                  Fast & Responsive
                </h3>
                <p class="mt-5 text-base text-gray-500">
                  Built with Nuxt.js for optimal performance and great user
                  experience across all devices.
                </p>
              </div>
            </div>
          </div>

          <div class="pt-6">
            <div class="flow-root bg-white rounded-lg px-6 pb-8">
              <div class="-mt-6">
                <div>
                  <span
                    class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg"
                  >
                    <svg
                      class="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </span>
                </div>
                <h3
                  class="mt-8 text-lg font-medium text-gray-900 tracking-tight"
                >
                  Modern Design
                </h3>
                <p class="mt-5 text-base text-gray-500">
                  Clean, modern UI with beautiful gradients and smooth
                  animations for a delightful experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Home",
  layout: "default",
});

const currentUser = ref(null);

// Check if user is logged in on page load
onMounted(() => {
  const userData = localStorage.getItem("currentUser");
  if (userData) {
    currentUser.value = JSON.parse(userData);
  }
});

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  currentUser.value = null;
  // Optionally redirect to login page
  navigateTo("/login");
};
</script>

<style scoped>
/* Additional styles for the home page */
.grid {
  display: grid;
}
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.gap-8 {
  gap: 2rem;
}
.sm\:grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.lg\:grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.pt-6 {
  padding-top: 1.5rem;
}
.flow-root {
}
.bg-white {
  background-color: #ffffff;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.pb-8 {
  padding-bottom: 2rem;
}
.-mt-6 {
  margin-top: -1.5rem;
}
.inline-flex {
  display: inline-flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.p-3 {
  padding: 0.75rem;
}
.bg-indigo-500 {
  background-color: #6366f1;
}
.rounded-md {
  border-radius: 0.375rem;
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.h-6 {
  height: 1.5rem;
}
.w-6 {
  width: 1.5rem;
}
.text-white {
  color: #ffffff;
}
.mt-8 {
  margin-top: 2rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.font-medium {
  font-weight: 500;
}
.text-gray-900 {
  color: #111827;
}
.tracking-tight {
  letter-spacing: -0.025em;
}
.mt-5 {
  margin-top: 1.25rem;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-gray-500 {
  color: #6b7280;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.sm\:text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.md\:text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}
.text-indigo-600 {
  color: #6366f1;
}
.mt-3 {
  margin-top: 0.75rem;
}
.max-w-md {
  max-width: 28rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.sm\:text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.md\:mt-5 {
  margin-top: 1.25rem;
}
.md\:text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.md\:max-w-3xl {
  max-width: 48rem;
}
.mt-5 {
  margin-top: 1.25rem;
}
.sm\:flex {
  display: flex;
}
.sm\:justify-center {
  justify-content: center;
}
.md\:mt-8 {
  margin-top: 2rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.w-full {
  width: 100%;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.border {
  border-width: 1px;
}
.border-transparent {
  border-color: transparent;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.font-medium {
  font-weight: 500;
}
.rounded-md {
  border-radius: 0.375rem;
}
.text-white {
  color: #ffffff;
}
.bg-indigo-600 {
  background-color: #6366f1;
}
.hover\:bg-indigo-700:hover {
  background-color: #5855eb;
}
.md\:py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.md\:text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.md\:px-10 {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.sm\:mt-0 {
  margin-top: 0;
}
.sm\:ml-3 {
  margin-left: 0.75rem;
}
.text-indigo-600 {
  color: #6366f1;
}
.bg-white {
  background-color: #ffffff;
}
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.mt-16 {
  margin-top: 4rem;
}
.mt-4 {
  margin-top: 1rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-gray-600 {
  color: #4b5563;
}
.font-semibold {
  font-weight: 600;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-gray-500 {
  color: #6b7280;
}
.mt-2 {
  margin-top: 0.5rem;
}
.inline-flex {
  display: inline-flex;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.border-transparent {
  border-color: transparent;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.font-medium {
  font-weight: 500;
}
.rounded-md {
  border-radius: 0.375rem;
}
.text-white {
  color: #ffffff;
}
.bg-red-600 {
  background-color: #dc2626;
}
.hover\:bg-red-700:hover {
  background-color: #b91c1c;
}
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
}
.focus\:ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus\:ring-red-500:focus {
  --tw-ring-color: #ef4444;
}
</style>
