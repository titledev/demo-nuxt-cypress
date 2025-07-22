describe("Application Flow Tests", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("should display home page with navigation", () => {
    // Check if navigation is present
    cy.get("nav").should("be.visible");
    cy.get("a").contains("Demo App").should("be.visible");
    cy.get("a").contains("Login").should("be.visible");
    cy.get("a").contains("Sign Up").should("be.visible");

    // Check if main content is present
    cy.get("h1").should("contain", "Welcome to");
    cy.get("h1").should("contain", "Demo App");
    cy.get("p").should(
      "contain",
      "A modern Nuxt.js application with authentication"
    );
  });

  it("should navigate from home to login page", () => {
    // Click on Sign In button
    cy.get("a").contains("Sign In").click();

    // Should navigate to login page
    cy.url().should("include", "/login");
    cy.get("h2").should("contain", "Sign in to your account");
  });

  it("should navigate from home to register page", () => {
    // Click on Sign Up button
    cy.get("a").contains("Sign Up").click();

    // Should navigate to register page
    cy.url().should("include", "/register");
    cy.get("h2").should("contain", "Create your account");
  });

  it("should navigate using navigation bar links", () => {
    // Click Login in navigation
    cy.get("nav").find("a").contains("Login").click();
    cy.url().should("include", "/login");

    // Go back to home
    cy.get("nav").find("a").contains("Demo App").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    // Click Sign Up in navigation
    cy.get("nav").find("a").contains("Sign Up").click();
    cy.url().should("include", "/register");
  });

  it("should complete full registration and login flow", () => {
    // Start from home page
    cy.visit("/");

    // Navigate to register page
    cy.get("a").contains("Sign Up").click();
    cy.url().should("include", "/register");

    // Fill out registration form
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();

    // Submit registration
    cy.get('button[type="submit"]').click();

    // Should redirect to login page
    cy.url().should("include", "/login");

    // Verify user is saved to localStorage
    cy.window().then((win) => {
      const users = JSON.parse(
        win.localStorage.getItem("registeredUsers") || "[]"
      );
      const newUser = users.find(
        (user) => user.email === "testuser@example.com"
      );
      expect(newUser).to.exist;
      expect(newUser.name).to.equal("Test User");
    });

    // Login with the new account
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Should redirect to home page
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    // Verify currentUser is saved and user info is displayed
    cy.window().then((win) => {
      const currentUser = JSON.parse(
        win.localStorage.getItem("currentUser") || "{}"
      );
      expect(currentUser.name).to.equal("Test User");
      expect(currentUser.email).to.equal("testuser@example.com");
    });

    // Check if user info is displayed on home page
    cy.get("p").contains("Welcome back, Test User!").should("be.visible");
    cy.get("p").contains("testuser@example.com").should("be.visible");
  });

  it("should handle logout functionality", () => {
    // First login with demo credentials
    cy.visit("/login");
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Should be on home page with user info
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.get("p").contains("Welcome back, Demo User!").should("be.visible");

    // Click logout button
    cy.get("button").contains("Sign Out").click();

    // Should redirect to login page
    cy.url().should("include", "/login");

    // Verify currentUser is removed from localStorage
    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem("currentUser");
      expect(currentUser).to.be.null;
    });
  });

  it("should handle navigation between login and register pages", () => {
    // Start from login page
    cy.visit("/login");

    // Click sign up link
    cy.get("a").contains("Sign up").click();
    cy.url().should("include", "/register");

    // Click sign in link
    cy.get("a").contains("Sign in").click();
    cy.url().should("include", "/login");
  });

  it("should maintain consistent styling across pages", () => {
    // Check home page styling
    cy.visit("/");
    cy.get(".bg-gradient-to-br").should("be.visible");
    cy.get(".text-indigo-600").should("be.visible");

    // Check login page styling
    cy.visit("/login");
    cy.get(".bg-gradient-to-br").should("be.visible");
    cy.get(".text-indigo-600").should("be.visible");

    // Check register page styling
    cy.visit("/register");
    cy.get(".bg-gradient-to-br").should("be.visible");
    cy.get(".text-indigo-600").should("be.visible");
  });

  it("should have responsive design on all pages", () => {
    const viewports: Array<{ width: number; height: number; name: string }> = [
      { width: 375, height: 667, name: "mobile" },
      { width: 768, height: 1024, name: "tablet" },
      { width: 1920, height: 1080, name: "desktop" },
    ];

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);

      // Test home page
      cy.visit("/");
      cy.get("nav").should("be.visible");
      cy.get("h1").should("be.visible");

      // Test login page
      cy.visit("/login");
      cy.get("form").should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");

      // Test register page
      cy.visit("/register");
      cy.get("form").should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });
  });

  it("should handle browser back and forward navigation", () => {
    // Navigate through pages
    cy.visit("/");
    cy.visit("/login");
    cy.visit("/register");

    // Go back
    cy.go("back");
    cy.url().should("include", "/login");

    // Go back again
    cy.go("back");
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    // Go forward
    cy.go("forward");
    cy.url().should("include", "/login");
  });

  it("should handle page refresh on all pages", () => {
    // Test home page refresh
    cy.visit("/");
    cy.reload();
    cy.get("h1").should("contain", "Welcome to");

    // Test login page refresh
    cy.visit("/login");
    cy.reload();
    cy.get("h2").should("contain", "Sign in to your account");

    // Test register page refresh
    cy.visit("/register");
    cy.reload();
    cy.get("h2").should("contain", "Create your account");
  });

  it("should handle form data persistence during navigation", () => {
    // Start on login page and enter partial data
    cy.visit("/login");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="remember-me"]').click();

    // Navigate to register page
    cy.get("a").contains("Sign up").click();

    // Navigate back to login
    cy.get("a").contains("Sign in").click();

    // Form should be reset (expected behavior)
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="remember-me"]').should("not.be.checked");
  });

  it("should handle keyboard shortcuts and accessibility", () => {
    // Test keyboard navigation on home page
    cy.visit("/");
    cy.get("body").tab();
    cy.focused().should("be.visible");

    // Test keyboard navigation on login page
    cy.visit("/login");
    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "email");

    // Test keyboard navigation on register page
    cy.visit("/register");
    cy.get("body").tab();
    cy.focused().should("have.attr", "name", "name");
  });

  it("should handle error states gracefully", () => {
    // Test login with invalid credentials
    cy.visit("/login");
    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.get("div").contains("Invalid email or password").should("be.visible");

    // Should still be able to navigate
    cy.get("a").contains("Sign up").click();
    cy.url().should("include", "/register");
  });

  it("should handle loading states properly", () => {
    // Test login loading state
    cy.visit("/login");
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Should show loading state
    cy.get('button[type="submit"]').should("contain", "Signing in...");
    cy.get('button[type="submit"]').should("be.disabled");

    // Should redirect after loading
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should handle concurrent form submissions", () => {
    // Test rapid form submissions on login
    cy.visit("/login");
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit multiple times rapidly
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').click();

    // Should handle gracefully
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should validate all form fields properly", () => {
    // Test login form validation
    cy.visit("/login");
    cy.get('button[type="submit"]').click();

    // Should show validation errors
    cy.get("p").contains("Email is required").should("be.visible");
    cy.get("p").contains("Password is required").should("be.visible");

    // Test register form validation
    cy.visit("/register");
    cy.get('button[type="submit"]').click();

    // Should show validation errors
    cy.get("p").contains("Name is required").should("be.visible");
    cy.get("p").contains("Email is required").should("be.visible");
    cy.get("p").contains("Password is required").should("be.visible");
    cy.get("p").contains("Please confirm your password").should("be.visible");
  });

  it("should handle special characters and edge cases", () => {
    // Test special characters in forms
    cy.visit("/register");
    cy.get('input[name="name"]').type("O'Connor");
    cy.get('input[name="email"]').type("test+tag@example.com");
    cy.get('input[name="password"]').type("password@123!");
    cy.get('input[name="confirmPassword"]').type("password@123!");
    cy.get('input[name="agree-terms"]').click();

    // Should handle special characters without errors
    cy.get("p")
      .contains("Name must be at least 2 characters")
      .should("not.exist");
    cy.get("p")
      .contains("Please enter a valid email address")
      .should("not.exist");
  });

  it("should maintain consistent branding across pages", () => {
    // Check branding elements on all pages
    const pages: string[] = ["/", "/login", "/register"];

    pages.forEach((page) => {
      cy.visit(page);

      // Check navigation branding
      cy.get("nav").find("a").contains("Demo App").should("be.visible");

      // Check consistent color scheme
      cy.get(".text-indigo-600").should("be.visible");
      cy.get(".bg-indigo-600").should("be.visible");
    });
  });

  it("should handle form submission with different input methods", () => {
    // Test login with Enter key
    cy.visit("/login");
    cy.get('input[name="email"]').type("demo@example.com");
    cy.get('input[name="password"]').type("password123{enter}");

    // Should redirect to home
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    // Test register with Enter key
    cy.visit("/register");
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="agree-terms"]').click();
    cy.get('input[name="confirmPassword"]').type("{enter}");

    // Should redirect to login
    cy.url().should("include", "/login");
  });
});

describe("Performance and Load Tests", () => {
  it("should load pages quickly", () => {
    // Test page load performance
    cy.visit("/", { timeout: 10000 });
    cy.get("h1").should("be.visible");

    cy.visit("/login", { timeout: 10000 });
    cy.get("h2").should("be.visible");

    cy.visit("/register", { timeout: 10000 });
    cy.get("h2").should("be.visible");
  });

  it("should handle multiple rapid page navigations", () => {
    // Rapidly navigate between pages
    for (let i = 0; i < 5; i++) {
      cy.visit("/");
      cy.visit("/login");
      cy.visit("/register");
    }

    // Should still be functional
    cy.visit("/login");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });
});
