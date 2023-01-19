import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import CreateItem from "./CreateItem";
import useStore from "../hooks/useStore";

const initialStoreState = useStore.getState();

describe("CreateItem", () => {
  beforeEach(() => {
    useStore.setState(
      {
        ...initialStoreState,
        addItem: jest.fn(),
      },
      true
    );
  });

  it("should reset state once an item has been created", async () => {
    const user = userEvent.setup();
    render(<CreateItem />);

    await user.type(screen.getByRole("textbox"), "Mock Item");
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("should trigger addItem when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateItem />);

    await user.type(screen.getByRole("textbox"), "Mock Item");
    await user.click(screen.getByRole("button"));

    expect(useStore.getState().addItem).toHaveBeenCalledWith("Mock Item");
  });
});
