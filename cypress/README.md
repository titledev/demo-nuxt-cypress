# Cypress Test Files for Login Form Application (TypeScript)

This directory contains comprehensive Cypress test files for the login form application written in TypeScript. These tests cover all aspects of the application including form validation, user interactions, accessibility, and integration flows.

## 📁 Test Files

### 1. `login.cy.ts`

**Comprehensive tests for the login form functionality**

**Test Coverage:**

- ✅ Form display and element visibility
- ✅ Form validation (empty fields, invalid email, short password)
- ✅ Successful login flow with valid credentials
- ✅ Error handling for invalid credentials
- ✅ Real-time validation error clearing
- ✅ Remember me checkbox functionality
- ✅ Navigation to registration page
- ✅ Form accessibility (labels, autocomplete attributes)
- ✅ Keyboard navigation
- ✅ Enter key form submission
- ✅ Loading states and spinner visibility
- ✅ Form data clearing after successful login
- ✅ Network error handling
- ✅ Email validation on blur
- ✅ Responsive design testing
- ✅ Integration with registration flow
- ✅ Form state management during navigation
- ✅ Multiple rapid submissions handling

**Demo Credentials:**

- Email: `demo@example.com`
- Password: `password123`

### 2. `register.cy.ts`

**Comprehensive tests for the registration form functionality**

**Test Coverage:**

- ✅ Form display and element visibility
- ✅ Form validation (empty fields, short name, invalid email, short password, mismatched passwords)
- ✅ Terms and conditions agreement validation
- ✅ Successful registration flow
- ✅ Error handling for existing email
- ✅ Real-time validation error clearing
- ✅ Terms checkbox functionality
- ✅ Navigation to login page
- ✅ Form accessibility (labels, autocomplete attributes)
- ✅ Keyboard navigation
- ✅ Enter key form submission
- ✅ Loading states and spinner visibility
- ✅ Form data clearing after successful registration
- ✅ Network error handling
- ✅ Field validation on blur
- ✅ Responsive design testing
- ✅ Integration with login flow
- ✅ Form state management during navigation
- ✅ Multiple rapid submissions handling
- ✅ Password strength validation
- ✅ Special characters in name field

**Test Cases:**

- Existing email: `existing@example.com` (triggers error)
- Valid registration: Any email except `existing@example.com`

### 3. `app-flow.cy.ts`

**End-to-end application flow and integration tests**

**Test Coverage:**

- ✅ Home page display and navigation
- ✅ Complete registration and login flow
- ✅ Navigation between all pages
- ✅ Consistent styling across pages
- ✅ Responsive design on all pages
- ✅ Browser back/forward navigation
- ✅ Page refresh handling
- ✅ Form data persistence during navigation
- ✅ Keyboard shortcuts and accessibility
- ✅ Error state handling
- ✅ Loading state handling
- ✅ Concurrent form submissions
- ✅ Form validation across all forms
- ✅ Special characters and edge cases
- ✅ Consistent branding across pages
- ✅ Form submission with different input methods
- ✅ Performance and load testing
- ✅ Multiple rapid page navigations

## 🚀 How to Use These Tests

### Prerequisites

1. Install Cypress in your target repository:

   ```bash
   npm install cypress --save-dev
   ```

2. Initialize Cypress:
   ```bash
   npx cypress open
   ```

### Copying Tests to Your Repository

1. **Copy the test files:**

   ```bash
   # Copy the entire cypress directory
   cp -r cypress/ /path/to/your/repo/
   ```

2. **Update Cypress configuration** (if needed):

   ```typescript
   // cypress.config.ts
   import { defineConfig } from "cypress";

   export default defineConfig({
     e2e: {
       baseUrl: "http://localhost:3000", // Update to your app's URL
       setupNodeEvents(on, config) {
         // implement node event listeners here
       },
     },
   });
   ```

3. **Add test scripts to package.json:**
   ```json
   {
     "scripts": {
       "cypress:open": "cypress open",
       "cypress:run": "cypress run",
       "test:e2e": "cypress run --spec 'cypress/e2e/**/*.cy.ts'"
     }
   }
   ```

### Running the Tests

1. **Open Cypress Test Runner:**

   ```bash
   npm run cypress:open
   ```

2. **Run all tests in headless mode:**

   ```bash
   npm run cypress:run
   ```

3. **Run specific test files:**

   ```bash
   # Run only login tests
   npx cypress run --spec "cypress/e2e/login.cy.ts"

   # Run only registration tests
   npx cypress run --spec "cypress/e2e/register.cy.ts"

   # Run only app flow tests
   npx cypress run --spec "cypress/e2e/app-flow.cy.ts"
   ```

## 🎯 Test Scenarios Covered

### Login Form Tests

- **Form Validation:** Empty fields, invalid email format, short password
- **Authentication:** Valid credentials, invalid credentials, error messages
- **User Experience:** Loading states, error clearing, checkbox functionality
- **Accessibility:** Keyboard navigation, proper labels, autocomplete attributes
- **Responsive Design:** Mobile, tablet, and desktop viewports

### Registration Form Tests

- **Form Validation:** All required fields, password confirmation, terms agreement
- **User Experience:** Real-time validation, loading states, error handling
- **Data Handling:** Special characters, password strength, existing email detection
- **Accessibility:** Complete keyboard navigation, proper form structure
- **Integration:** Navigation to login, form state management

### Application Flow Tests

- **Navigation:** Complete user journey from home to login/register
- **Integration:** Full registration and login flow
- **Performance:** Page load times, rapid navigation handling
- **Cross-browser:** Back/forward navigation, page refresh
- **Responsive:** All viewport sizes across all pages

## 🔧 Customization

### Updating Test Data

If your application uses different credentials or validation rules:

1. **Update demo credentials in login tests:**

   ```typescript
   // In login.cy.ts, update these lines:
   cy.get('input[name="email"]').type("your-demo-email@example.com");
   cy.get('input[name="password"]').type("your-demo-password");
   ```

2. **Update validation rules:**
   ```typescript
   // Update password length requirements, email formats, etc.
   cy.get("p").contains("Password must be at least 8 characters"); // Update length
   ```

### Adding New Test Cases

The test structure is modular and easy to extend:

```typescript
it("should test new functionality", () => {
  // Your new test case
  cy.visit("/your-page");
  cy.get("your-selector").should("be.visible");
  // ... more assertions
});
```

## 📊 Test Results

When you run these tests, you should see:

- ✅ **Login Form:** ~20 test cases covering all login functionality
- ✅ **Registration Form:** ~25 test cases covering all registration functionality
- ✅ **Application Flow:** ~15 test cases covering end-to-end user journeys
- ✅ **Total Coverage:** ~60 comprehensive test cases

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing due to different selectors:**

   - Update CSS selectors in tests to match your application
   - Check for different class names or element structures

2. **Base URL issues:**

   - Update `baseUrl` in `cypress.config.ts` to match your development server
   - Ensure your app is running on the correct port

3. **Timing issues:**

   - Add `cy.wait()` or increase timeouts for slower applications
   - Use `cy.get().should('be.visible')` instead of `cy.get()` for better reliability

4. **Form validation differences:**
   - Update validation error messages to match your application
   - Adjust validation rules (password length, email format, etc.)

### Debugging Tips

1. **Use Cypress Test Runner for debugging:**

   ```bash
   npx cypress open
   ```

2. **Add debugging statements:**

   ```typescript
   cy.log("Debug message");
   cy.get("element").then(($el) => {
     console.log("Element found:", $el);
   });
   ```

3. **Take screenshots on failure:**
   ```typescript
   // Add to cypress.config.ts
   screenshotOnRunFailure: true;
   ```

## 📝 Notes

- These tests are designed for a Nuxt.js application with the specific form structure shown
- All tests include proper error handling and loading state verification
- Tests are written to be resilient to minor UI changes
- The test files are self-contained and can be copied to any repository
- All tests follow Cypress best practices and include proper assertions
- **TypeScript Support:** All tests are written in TypeScript with proper type definitions

## 🤝 Contributing

When adding new tests:

1. Follow the existing naming conventions
2. Include proper error handling
3. Test both positive and negative scenarios
4. Add accessibility and responsive design tests
5. Include proper comments explaining test purpose
6. Use TypeScript for better type safety and IDE support
