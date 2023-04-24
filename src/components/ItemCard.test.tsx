import { vi, describe, beforeEach, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import ItemCard from "./ItemCard";
import { Item, ItemStatus } from "../types";
import useStore from "../hooks/useStore";

const initialStoreState = useStore.getState();

describe("ItemCard", () => {
  let mockItem: Item;

  beforeEach(() => {
    mockItem = {
      id: "12345",
      title: "Mock Item",
      status: ItemStatus.Incomplete,
      dateCreated: new Date(),
    };

    useStore.setState(
      {
        ...initialStoreState,
        removeItem: vi.fn(),
        toggleItemStatus: vi.fn(),
      },
      true
    );
  });

  it("should trigger removeItem when the toggle button is clicked", async () => {
    const user = userEvent.setup();

    render(<ItemCard {...mockItem} />);

    await user.click(screen.getByRole("button", { name: "Remove item" }));

    expect(useStore.getState().removeItem).toHaveBeenCalledWith(mockItem.id);
  });

  it("should trigger toggleItemStatus when the toggle button is clicked", async () => {
    const user = userEvent.setup();

    render(<ItemCard {...mockItem} />);

    await user.click(screen.getByRole("button", { name: "Toggle status" }));

    expect(useStore.getState().toggleItemStatus).toHaveBeenCalledWith(
      mockItem.id
    );
  });
});
