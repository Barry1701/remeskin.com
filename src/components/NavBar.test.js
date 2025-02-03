import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { MemoryRouter } from "react-router-dom";

// We'll create a helper function to wrap NavBar in needed providers
function renderNavBarWithUser(user) {
  return render(
    <MemoryRouter>
      <CurrentUserContext.Provider value={user}>
        <NavBar />
      </CurrentUserContext.Provider>
    </MemoryRouter>
  );
}

describe("NavBar", () => {
  test("shows Sign In and Sign Up when logged out", () => {
    // user = null => no current user
    renderNavBarWithUser(null);

    // Check if NavBar displays sign in/up
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    // Possibly check that "Sign Out" is absent
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  test("shows Profile and Sign Out when logged in", () => {
    // user object => logged in
    const mockUser = { username: "TestUser", profile_id: 1 };
    renderNavBarWithUser(mockUser);

    // Check presence of user-specific links
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();

    // "Sign In" and "Sign Up" should be absent
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
  });

  test("can toggle mobile menu (if using expand='md')", () => {
    // Another scenario: checking for toggler button, etc.
    const mockUser = null;
    renderNavBarWithUser(mockUser);

    // If there's a hamburger button, you can test click expand
    const toggleButton = screen.getByRole("button", { name: /toggle navigation/i });
    fireEvent.click(toggleButton);
    // Expect some menu items or classes to appear
    // This will depend on your actual NavBar markup and aria labels
  });
});
