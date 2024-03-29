import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateItem from "./CreateItem";
import useStore from "../hooks/useStore";

const initialStoreState = useStore.getState();

describe("CreateItem", () => {
  beforeEach(() => {
    useStore.setState(
      {
        ...initialStoreState,
        addItem: vi.fn(),
      },
      true
    );
  });

  it("should reset state once an item has been created", async () => {
    const user = userEvent.setup();

    render(<CreateItem />);

    await user.type(screen.getByRole("textbox"), "Mock Item");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("should trigger addItem once the add button is clicked", async () => {
    const user = userEvent.setup();

    render(<CreateItem />);

    await user.type(screen.getByRole("textbox"), "Mock Item");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(useStore.getState().addItem).toHaveBeenCalledWith("Mock Item");
  });
});
