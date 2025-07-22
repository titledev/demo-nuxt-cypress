<template>
  <div>
    <NuxtRouteAnnouncer />

    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              Demo App
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/login"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Sign Up
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Add Tailwind-like utility classes for basic styling */
.min-h-screen {
  min-height: 100vh;
}
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
.from-blue-50 {
  --tw-gradient-from: #eff6ff;
  --tw-gradient-stops: var(--tw-gradient-from),
    var(--tw-gradient-to, rgba(239, 246, 255, 0));
}
.to-indigo-100 {
  --tw-gradient-to: #e0e7ff;
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
.p-4 {
  padding: 1rem;
}
.max-w-md {
  max-width: 28rem;
}
.w-full {
  width: 100%;
}
.space-y-8 > * + * {
  margin-top: 2rem;
}
.text-center {
  text-align: center;
}
.mt-6 {
  margin-top: 1.5rem;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.font-extrabold {
  font-weight: 800;
}
.text-gray-900 {
  color: #111827;
}
.mt-2 {
  margin-top: 0.5rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-gray-600 {
  color: #4b5563;
}
.mt-8 {
  margin-top: 2rem;
}
.space-y-6 > * + * {
  margin-top: 1.5rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.-space-y-px > * + * {
  margin-top: -1px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.appearance-none {
  appearance: none;
}
.rounded-none {
  border-radius: 0;
}
.relative {
  position: relative;
}
.block {
  display: block;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.border {
  border-width: 1px;
}
.border-gray-300 {
  border-color: #d1d5db;
}
.placeholder-gray-500::placeholder {
  color: #6b7280;
}
.text-gray-900 {
  color: #111827;
}
.rounded-t-md {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\:ring-indigo-500:focus {
  --tw-ring-color: #6366f1;
}
.focus\:border-indigo-500:focus {
  border-color: #6366f1;
}
.focus\:z-10:focus {
  z-index: 10;
}
.sm\:text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.border-red-500 {
  border-color: #ef4444;
}
.mt-1 {
  margin-top: 0.25rem;
}
.text-red-600 {
  color: #dc2626;
}
.rounded-b-md {
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
.justify-between {
  justify-content: space-between;
}
.h-4 {
  height: 1rem;
}
.w-4 {
  width: 1rem;
}
.text-indigo-600 {
  color: #6366f1;
}
.focus\:ring-indigo-500:focus {
  --tw-ring-color: #6366f1;
}
.border-gray-300 {
  border-color: #d1d5db;
}
.rounded {
  border-radius: 0.25rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.font-medium {
  font-weight: 500;
}
.hover\:text-indigo-500:hover {
  color: #6366f1;
}
.group {
}
.w-full {
  width: 100%;
}
.justify-center {
  justify-content: center;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
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
.bg-indigo-600 {
  background-color: #6366f1;
}
.hover\:bg-indigo-700:hover {
  background-color: #5855eb;
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
.focus\:ring-indigo-500:focus {
  --tw-ring-color: #6366f1;
}
.disabled\:opacity-50:disabled {
  opacity: 0.5;
}
.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.absolute {
  position: absolute;
}
.left-0 {
  left: 0;
}
.inset-y-0 {
  top: 0;
  bottom: 0;
}
.pl-3 {
  padding-left: 0.75rem;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.h-5 {
  height: 1.25rem;
}
.w-5 {
  width: 1.25rem;
}
.text-white {
  color: #ffffff;
}
.bg-red-50 {
  background-color: #fef2f2;
}
.border-red-200 {
  border-color: #fecaca;
}
.p-4 {
  padding: 1rem;
}
.bg-white {
  background-color: #ffffff;
}
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.border-b {
  border-bottom-width: 1px;
}
.max-w-7xl {
  max-width: 80rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.sm\:px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.lg\:px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.h-16 {
  height: 4rem;
}
.space-x-4 > * + * {
  margin-left: 1rem;
}
.hover\:text-gray-900:hover {
  color: #111827;
}
.hover\:bg-indigo-700:hover {
  background-color: #5855eb;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
