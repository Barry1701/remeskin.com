import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar Component", () => {
  test("renders avatar image with given src and text", () => {
    const testSrc = "test-avatar.jpg";
    const testText = "Test User";
    render(<Avatar src={testSrc} text={testText} height={50} />);

    // Check if the image is rendered with the correct src and alt text
    const img = screen.getByAltText("avatar");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", testSrc);
    
    // Check if the image has the correct height
    expect(img).toHaveAttribute("height", "50");

    // Check if the text is rendered alongside the avatar
    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});
