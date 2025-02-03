// This file contains tests for the Post component.

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Post from "./Post";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MemoryRouter } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

// Mock axiosRes methods to avoid real network requests.
jest.mock("../../api/axiosDefaults", () => ({
  axiosRes: {
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

// Helper function to render the Post component with necessary context providers.
const renderPostWithUser = (user, postProps = {}) => {
  const defaultPost = {
    id: 1,
    owner: "User1",
    profile_id: 1,
    profile_image: "avatar.jpg",
    comments_count: 3,
    likes_count: 5,
    like_id: null,
    title: "Test Post",
    content: "This is a test post content.",
    image: "post.jpg",
    updated_at: "2021-01-01",
    category: "general",
    // setPosts is a mock function to verify state updates.
    setPosts: jest.fn(),
  };

  return render(
    <MemoryRouter>
      <CurrentUserContext.Provider value={user}>
        <Post {...defaultPost} {...postProps} />
      </CurrentUserContext.Provider>
    </MemoryRouter>
  );
};

describe("Post Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays post details correctly", () => {
    // Render the post with a non-owner user.
    renderPostWithUser({ username: "User2", profile_id: 2 });
    
    // Use getAllByText for the title since multiple elements might contain "Test Post".
    const titleElements = screen.getAllByText(/Test Post/i);
    expect(titleElements.length).toBeGreaterThan(0);
    
    // Check if the content and category label are displayed.
    expect(screen.getByText(/This is a test post content/i)).toBeInTheDocument();
    expect(screen.getByText(/Category:/i)).toBeInTheDocument();
  });

  test("allows a logged-in non-owner user to like the post", async () => {
    // Create a mock function for setPosts.
    const setPostsMock = jest.fn();
    // Render the post with a non-owner user.
    renderPostWithUser(
      { username: "User2", profile_id: 2 },
      { setPosts: setPostsMock, likes_count: 5, like_id: null }
    );
    
    // Prepare a mock response for axiosRes.post call.
    const mockResponse = { id: 100 }; // Example like ID.
    axiosRes.post.mockResolvedValueOnce({ data: mockResponse });
    
    // Find the like icon (for a non-liked post, assume it has classes "far fa-heart").
    const container = document.body;
    const likeIcon = container.querySelector("i.far.fa-heart");
    expect(likeIcon).toBeInTheDocument();
    
    // Simulate a click on the like icon.
    fireEvent.click(likeIcon);
    
    // Wait for axiosRes.post to be called with the expected arguments.
    await waitFor(() =>
      expect(axiosRes.post).toHaveBeenCalledWith("/likes/", { post: 1 })
    );
    
    // Verify that the setPosts function was called to update the post state.
    expect(setPostsMock).toHaveBeenCalled();
  });

  test("does not allow owner to like their own post", async () => {
    // Render the post with the logged-in user being the owner.
    renderPostWithUser({ username: "User1", profile_id: 1 });
    
    // Find the like icon; for the owner, a tooltip should appear indicating they cannot like their own post.
    const container = document.body;
    const likeIcon = container.querySelector("i.far.fa-heart");
    expect(likeIcon).toBeInTheDocument();
    
    // Simulate mouse over on the like icon to trigger the tooltip.
    fireEvent.mouseOver(likeIcon);
    
    // Wait for the tooltip with the message "You can't like your own post!" to appear.
    const tooltip = await screen.findByText(/You can't like your own post!/i);
    expect(tooltip).toBeInTheDocument();
  });
});
