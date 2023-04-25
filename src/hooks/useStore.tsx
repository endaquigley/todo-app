import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { Item, ItemStatus } from "../types";

interface StoreState {
  items: Item[];
  addItem: (title: string) => void;
  removeItem: (id: string) => void;
  toggleItemStatus: (id: string) => void;
}

const useStore = create<StoreState, [["zustand/persist", StoreState]]>(
  persist(
    (set) => ({
      items: [],
      addItem: (title = "") => {
        return set((state) => ({
          items: [
            ...state.items,
            {
              id: uuidv4(),
              title: title.trim(),
              status: ItemStatus.Incomplete,
              dateCreated: new Date(),
            },
          ],
        }));
      },
      toggleItemStatus: (id: string) => {
        return set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                status:
                  item.status === ItemStatus.Incomplete
                    ? ItemStatus.Done
                    : ItemStatus.Incomplete,
              };
            } else {
              return item;
            }
          }),
        }));
      },
      removeItem: (id: string) => {
        return set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "todo-store",
    }
  )
);

export default useStore;
