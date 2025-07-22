describe("Registration Form", () => {
  beforeEach(() => {
    // Visit the register page before each test
    cy.visit("/register");
  });

  it("should display registration form with all elements", () => {
    // Check if the page loads correctly
    cy.get("h2").should("contain", "Create your account");
    cy.get("p").should(
      "contain",
      "Join us today! Please fill in your details."
    );

    // Check if form elements are present
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[name="confirmPassword"]').should("be.visible");
    cy.get('input[name="agree-terms"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");

    // Check if links are present
    cy.get("a").contains("Sign in").should("be.visible");
  });

  it("should show validation errors for empty form submission", () => {
    // Submit form without entering any data
    cy.get('button[type="submit"]').click();

    // Check for name validation error
    cy.get('input[name="name"]').should("have.class", "border-red-500");
    cy.get("p").contains("Name is required").should("be.visible");

    // Check for email validation error
    cy.get('input[name="email"]').should("have.class", "border-red-500");
    cy.get("p").contains("Email is required").should("be.visible");

    // Check for password validation error
    cy.get('input[name="password"]').should("have.class", "border-red-500");
    cy.get("p").contains("Password is required").should("be.visible");

    // Check for confirm password validation error
    cy.get('input[name="confirmPassword"]').should(
      "have.class",
      "border-red-500"
    );
    cy.get("p").contains("Please confirm your password").should("be.visible");
  });

  it("should show validation error for short name", () => {
    // Enter short name
    cy.get('input[name="name"]').type("A");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check for name length validation error
    cy.get("p")
      .contains("Name must be at least 2 characters")
      .should("be.visible");
  });

  it("should show validation error for invalid email format", () => {
    // Enter invalid email
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check for email format validation error
    cy.get("p")
      .contains("Please enter a valid email address")
      .should("be.visible");
  });

  it("should show validation error for short password", () => {
    // Enter valid data but short password
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="confirmPassword"]').type("123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check for password length validation error
    cy.get("p")
      .contains("Password must be at least 6 characters")
      .should("be.visible");
  });

  it("should show validation error for mismatched passwords", () => {
    // Enter valid data but mismatched passwords
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("differentpassword");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check for password mismatch validation error
    cy.get("p").contains("Passwords do not match").should("be.visible");
  });

  it("should show validation error when terms are not agreed", () => {
    // Enter valid data but don't agree to terms
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check for terms agreement validation error
    cy.get("p")
      .contains("You must agree to the terms and conditions")
      .should("be.visible");
  });

  it("should successfully register with valid data", () => {
    // Enter valid registration data
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check loading state
    cy.get('button[type="submit"]').should("contain", "Creating account...");
    cy.get('button[type="submit"]').should("be.disabled");

    // Wait for redirect to login page
    cy.url().should("include", "/login");

    // Verify user data is saved to localStorage
    cy.window().then((win) => {
      const users = JSON.parse(
        win.localStorage.getItem("registeredUsers") || "[]"
      );
      const newUser = users.find(
        (user) => user.email === "newuser@example.com"
      );
      expect(newUser).to.exist;
      expect(newUser.name).to.equal("John Doe");
      expect(newUser.password).to.equal("password123");
    });
  });

  it("should show error message for existing email", () => {
    // First, register a user
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("existing@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();
    cy.get('button[type="submit"]').click();

    // Wait for redirect and go back to register
    cy.url().should("include", "/login");
    cy.visit("/register");

    // Try to register with the same email
    cy.get('input[name="name"]').type("Another User");
    cy.get('input[name="email"]').type("existing@example.com");
    cy.get('input[name="password"]').type("differentpassword");
    cy.get('input[name="confirmPassword"]').type("differentpassword");
    cy.get('input[name="agree-terms"]').click();
    cy.get('button[type="submit"]').click();

    // Check for existing email error message
    cy.get("div")
      .contains("An account with this email already exists")
      .should("be.visible");
  });

  it("should clear validation errors when user starts typing", () => {
    // Submit empty form to trigger validation errors
    cy.get('button[type="submit"]').click();

    // Verify errors are shown
    cy.get("p").contains("Name is required").should("be.visible");
    cy.get("p").contains("Email is required").should("be.visible");

    // Start typing in name field
    cy.get('input[name="name"]').type("John");

    // Name error should be cleared
    cy.get("p").contains("Name is required").should("not.exist");

    // Start typing in email field
    cy.get('input[name="email"]').type("test@example.com");

    // Email error should be cleared
    cy.get("p").contains("Email is required").should("not.exist");
  });

  it("should handle terms and conditions checkbox", () => {
    // Check if terms checkbox is unchecked by default
    cy.get('input[name="agree-terms"]').should("not.be.checked");

    // Click the checkbox
    cy.get('input[name="agree-terms"]').click();

    // Check if it's now checked
    cy.get('input[name="agree-terms"]').should("be.checked");

    // Click again to uncheck
    cy.get('input[name="agree-terms"]').click();

    // Check if it's unchecked
    cy.get('input[name="agree-terms"]').should("not.be.checked");
  });

  it("should navigate to login page when clicking sign in link", () => {
    // Click on the sign in link
    cy.get("a").contains("Sign in").click();

    // Should navigate to login page
    cy.url().should("include", "/login");
  });

  it("should have proper form accessibility", () => {
    // Check if form inputs have proper labels
    cy.get('input[name="name"]').should("have.attr", "id", "name");
    cy.get('input[name="email"]').should("have.attr", "id", "email");
    cy.get('input[name="password"]').should("have.attr", "id", "password");
    cy.get('input[name="confirmPassword"]').should(
      "have.attr",
      "id",
      "confirmPassword"
    );
    cy.get('input[name="agree-terms"]').should(
      "have.attr",
      "id",
      "agree-terms"
    );

    // Check if form has proper autocomplete attributes
    cy.get('input[name="name"]').should("have.attr", "autocomplete", "name");
    cy.get('input[name="email"]').should("have.attr", "autocomplete", "email");
    cy.get('input[name="password"]').should(
      "have.attr",
      "autocomplete",
      "new-password"
    );
    cy.get('input[name="confirmPassword"]').should(
      "have.attr",
      "autocomplete",
      "new-password"
    );
  });

  it("should handle keyboard navigation", () => {
    // Tab through form elements
    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "name");

    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "email");

    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "password");

    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "confirmPassword");

    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "agree-terms");

    cy.get("body").tab();
    cy.focused().should("have.attr", "type", "submit");
  });

  it("should submit form on Enter key press", () => {
    // Enter valid registration data
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();

    // Submit with Enter key
    cy.get('input[name="confirmPassword"]').type("{enter}");

    // Should redirect to login page
    cy.url().should("include", "/login");
  });

  it("should show loading state during form submission", () => {
    // Enter valid registration data
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check loading state
    cy.get('button[type="submit"]').should("contain", "Creating account...");
    cy.get('button[type="submit"]').should("be.disabled");

    // Check if spinner is visible
    cy.get("svg.animate-spin").should("be.visible");
  });

  it("should clear form data after successful registration", () => {
    // Enter valid data and register successfully
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();
    cy.get('button[type="submit"]').click();

    // Navigate back to register page
    cy.visit("/register");

    // Check if form fields are empty
    cy.get('input[name="name"]').should("have.value", "");
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="password"]').should("have.value", "");
    cy.get('input[name="confirmPassword"]').should("have.value", "");
    cy.get('input[name="agree-terms"]').should("not.be.checked");
  });

  it("should handle network errors gracefully", () => {
    // Mock network error
    cy.intercept("POST", "**/register", { forceNetworkError: true }).as(
      "registerRequest"
    );

    // Enter valid registration data
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.get("div")
      .contains("An error occurred. Please try again.")
      .should("be.visible");
  });

  it("should validate fields on blur", () => {
    // Focus on name field and enter short name
    cy.get('input[name="name"]').focus().type("A").blur();

    // Should show validation error
    cy.get("p")
      .contains("Name must be at least 2 characters")
      .should("be.visible");

    // Enter valid name
    cy.get('input[name="name"]').clear().type("John Doe").blur();

    // Error should be cleared
    cy.get("p")
      .contains("Name must be at least 2 characters")
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

describe("Registration Form Integration Tests", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should integrate with login flow", () => {
    // Click sign in link
    cy.get("a").contains("Sign in").click();

    // Should be on login page
    cy.url().should("include", "/login");
    cy.get("h2").should("contain", "Sign in to your account");

    // Navigate back to register
    cy.visit("/register");
    cy.get("h2").should("contain", "Create your account");
  });

  it("should maintain form state during navigation", () => {
    // Enter partial data
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="agree-terms"]').click();

    // Navigate away and back
    cy.visit("/");
    cy.visit("/register");

    // Form should be reset (this is expected behavior)
    cy.get('input[name="name"]').should("have.value", "");
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="agree-terms"]').should("not.be.checked");
  });

  it("should handle multiple rapid submissions", () => {
    // Enter valid registration data
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();

    // Submit multiple times rapidly
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').click();

    // Should handle gracefully (button should be disabled during loading)
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should validate password strength requirements", () => {
    // Test various password scenarios
    const testCases: Array<{ password: string; expectedError: string | null }> =
      [
        {
          password: "123",
          expectedError: "Password must be at least 6 characters",
        },
        { password: "123456", expectedError: null }, // Valid password
        { password: "password123", expectedError: null }, // Valid password
      ];

    testCases.forEach(({ password, expectedError }) => {
      cy.get('input[name="password"]').clear().type(password);
      cy.get('input[name="confirmPassword"]').clear().type(password);

      if (expectedError) {
        cy.get('button[type="submit"]').click();
        cy.get("p").contains(expectedError).should("be.visible");
      } else {
        // Should not show error for valid password
        cy.get("p")
          .contains("Password must be at least 6 characters")
          .should("not.exist");
      }
    });
  });

  it("should handle special characters in name field", () => {
    // Test names with special characters
    const testNames: string[] = [
      "O'Connor",
      "José",
      "Jean-Pierre",
      "Mary-Jane",
      "D'Angelo",
    ];

    testNames.forEach((name) => {
      cy.get('input[name="name"]').clear().type(name);
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="confirmPassword"]').type("password123");
      cy.get('input[name="agree-terms"]').click();

      // Should not show validation error for valid names
      cy.get("p")
        .contains("Name must be at least 2 characters")
        .should("not.exist");
    });
  });
});
