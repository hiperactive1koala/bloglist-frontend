import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { expect } from "vitest";

test("that the form calls the event handler it received as props with the right details", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  let { container } = render(<BlogForm create={createBlog} />);

  const title = screen.getByPlaceholderText("Title of Blog");
  const author = screen.getByPlaceholderText("Author of Blog");
  const url = screen.getByPlaceholderText("Url of Blog");
  const createButton = container.querySelector("#create-blog");

  await user.type(title, "testing a form...");
  await user.type(author, "ko");
  await user.type(url, "unknown");

  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("ko");
  expect(createBlog.mock.calls[0][0].url).toBe("unknown");
});
