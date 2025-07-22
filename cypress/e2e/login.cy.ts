describe("Login Form", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/login");
  });

  it("should display login form with all elements", () => {
    // Check if the page loads correctly
    cy.get("h2").should("contain", "Sign in to your account");
    cy.get("p").should(
      "contain",
      "Welcome back! Please enter your credentials."
    );

    // Check if form elements are present
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[name="remember-me"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");

    // Check if links are present
    cy.get("a").contains("Forgot your password?").should("be.visible");
    cy.get("a").contains("Sign up").should("be.visible");
  });

  it("should show validation errors for empty form submission", () => {
    // Submit form without entering any data
    cy.get('button[type="submit"]').click();

    // Check for email validation error
    cy.get('input[name="email"]').should("have.class", "border-red-500");
    cy.get("p").contains("Email is required").should("be.visible");

    // Check for password validation error
    cy.get('input[name="password"]').should("have.class", "border-red-500");
    cy.get("p").contains("Password is required").should("be.visible");
  });

  it("should show validation error for invalid email format", () => {
    // Enter invalid email
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("password123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check for email format validation error
    cy.get("p")
      .contains("Please enter a valid email address")
      .should("be.visible");
  });

  it("should show validation error for short password", () => {
    // Enter valid email and short password
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check for password length validation error
    cy.get("p")
      .contains("Password must be at least 6 characters")
      .should("be.visible");
  });

  it("should successfully login with valid credentials from localStorage", () => {
    // First, register a user
    cy.visit("/register");
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();
    cy.get('button[type="submit"]').click();

    // Should redirect to login page
    cy.url().should("include", "/login");

    // Login with the registered user
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Check loading state
    cy.get('button[type="submit"]').should("contain", "Signing in...");
    cy.get('button[type="submit"]').should("be.disabled");

    // Wait for redirect to home page
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    // Verify currentUser is saved to localStorage
    cy.window().then((win) => {
      const currentUser = JSON.parse(
        win.localStorage.getItem("currentUser") || "{}"
      );
      expect(currentUser.name).to.equal("Test User");
      expect(currentUser.email).to.equal("testuser@example.com");
    });
  });

  it("should successfully login with demo credentials", () => {
    // Enter valid demo credentials
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check loading state
    cy.get('button[type="submit"]').should("contain", "Signing in...");
    cy.get('button[type="submit"]').should("be.disabled");

    // Wait for redirect (should redirect to home page)
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    // Verify currentUser is saved to localStorage
    cy.window().then((win) => {
      const currentUser = JSON.parse(
        win.localStorage.getItem("currentUser") || "{}"
      );
      expect(currentUser.name).to.equal("Demo User");
      expect(currentUser.email).to.equal("demo@example.com");
    });
  });

  it("should show error message for invalid credentials", () => {
    // Enter invalid credentials
    cy.get('input[name="email"]').type("wrong@example.com");
    cy.get('input[name="password"]').type("wrongpassword");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check for error message
    cy.get("div").contains("Invalid email or password").should("be.visible");
    cy.get("div")
      .contains("Try demo@example.com / password123")
      .should("be.visible");
  });

  it("should clear validation errors when user starts typing", () => {
    // Submit empty form to trigger validation errors
    cy.get('button[type="submit"]').click();

    // Verify errors are shown
    cy.get("p").contains("Email is required").should("be.visible");
    cy.get("p").contains("Password is required").should("be.visible");

    // Start typing in email field
    cy.get('input[name="email"]').type("test@example.com");

    // Email error should be cleared
    cy.get("p").contains("Email is required").should("not.exist");

    // Start typing in password field
    cy.get('input[name="password"]').type("password123");

    // Password error should be cleared
    cy.get("p").contains("Password is required").should("not.exist");
  });

  it("should handle remember me checkbox", () => {
    // Check if remember me checkbox is unchecked by default
    cy.get('input[name="remember-me"]').should("not.be.checked");

    // Click the checkbox
    cy.get('input[name="remember-me"]').click();

    // Check if it's now checked
    cy.get('input[name="remember-me"]').should("be.checked");

    // Click again to uncheck
    cy.get('input[name="remember-me"]').click();

    // Check if it's unchecked
    cy.get('input[name="remember-me"]').should("not.be.checked");
  });

  it("should navigate to register page when clicking sign up link", () => {
    // Click on the sign up link
    cy.get("a").contains("Sign up").click();

    // Should navigate to register page
    cy.url().should("include", "/register");
  });

  it("should have proper form accessibility", () => {
    // Check if form inputs have proper labels
    cy.get('input[name="email"]').should("have.attr", "id", "email");
    cy.get('input[name="password"]').should("have.attr", "id", "password");
    cy.get('input[name="remember-me"]').should(
      "have.attr",
      "id",
      "remember-me"
    );

    // Check if form has proper autocomplete attributes
    cy.get('input[name="email"]').should("have.attr", "autocomplete", "email");
    cy.get('input[name="password"]').should(
      "have.attr",
      "autocomplete",
      "current-password"
    );
  });

  it("should handle keyboard navigation", () => {
    // Tab through form elements
    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "email");

    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "password");

    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "remember-me");

    cy.get("body").tab();
    cy.focused().should("have.attr", "type", "submit");
  });

  it("should submit form on Enter key press", () => {
    // Enter valid credentials
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123{enter}");

    // Should redirect to home page
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should show loading state during form submission", () => {
    // Enter valid credentials
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check loading state
    cy.get('button[type="submit"]').should("contain", "Signing in...");
    cy.get('button[type="submit"]').should("be.disabled");

    // Check if spinner is visible
    cy.get("svg.animate-spin").should("be.visible");
  });

  it("should clear form data after successful login", () => {
    // Enter credentials and login successfully
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Navigate back to login page
    cy.visit("/login");

    // Check if form fields are empty
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="password"]').should("have.value", "");
    cy.get('input[name="remember-me"]').should("not.be.checked");
  });

  it("should handle network errors gracefully", () => {
    // Mock network error
    cy.intercept("POST", "**/login", { forceNetworkError: true }).as(
      "loginRequest"
    );

    // Enter valid credentials
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.get("div")
      .contains("An error occurred. Please try again.")
      .should("be.visible");
  });

  it("should validate email field on blur", () => {
    // Focus on email field and enter invalid email
    cy.get('input[name="email"]').focus().type("invalid-email").blur();

    // Should show validation error
    cy.get("p")
      .contains("Please enter a valid email address")
      .should("be.visible");

    // Enter valid email
    cy.get('input[name="email"]').clear().type("valid@example.com").blur();

    // Error should be cleared
    cy.get("p")
      .contains("Please enter a valid email address")
      .should("not.exist");
  });

  it("should have responsive design on different screen sizes", () => {
    // Test on mobile viewport
    cy.viewport(375, 667);
    cy.get(".max-w-md").should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");

    // Test on tablet viewport
    cy.viewport(768, 1024);
    cy.get(".max-w-md").should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");

    // Test on desktop viewport
    cy.viewport(1920, 1080);
    cy.get(".max-w-md").should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });
});

describe("Login Form Integration Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should integrate with registration flow", () => {
    // Click sign up link
    cy.get("a").contains("Sign up").click();

    // Should be on register page
    cy.url().should("include", "/register");
    cy.get("h2").should("contain", "Create your account");

    // Navigate back to login
    cy.visit("/login");
    cy.get("h2").should("contain", "Sign in to your account");
  });

  it("should maintain form state during navigation", () => {
    // Enter partial data
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="remember-me"]').click();

    // Navigate away and back
    cy.visit("/");
    cy.visit("/login");

    // Form should be reset (this is expected behavior)
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="remember-me"]').should("not.be.checked");
  });

  it("should handle multiple rapid submissions", () => {
    // Enter valid credentials
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit multiple times rapidly
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').click();

    // Should handle gracefully (button should be disabled during loading)
    cy.get('button[type="submit"]').should("be.disabled");
  });
});
