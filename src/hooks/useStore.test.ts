import { renderHook, act } from "@testing-library/react";

import useStore from "./useStore";
import { ItemStatus } from "../types";

const initialStoreState = useStore.getState();

describe("useStore", () => {
  beforeEach(() => {
    useStore.setState(initialStoreState, true);
  });

  it("initial state", () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.items).toHaveLength(0);
  });

  it("addItem", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addItem("New Item");
    });

    expect(result.current.items).toHaveLength(1);
  });

  it("updateItemStatus", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addItem("New Item");
    });

    const item = result.current.items[0];

    expect(item.status).toEqual(ItemStatus.Incomplete);

    act(() => {
      result.current.toggleItemStatus(item.id);
    });

    const updatedItem = result.current.items[0];

    expect(updatedItem.status).toEqual(ItemStatus.Done);
  });

  it("removeItem", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addItem("New Item");
    });

    const item = result.current.items[0];

    act(() => {
      result.current.removeItem(item.id);
    });

    expect(result.current.items).toHaveLength(0);
  });
});
