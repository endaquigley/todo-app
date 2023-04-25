import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { Item, ItemStatus } from "../types";

type State = {
  items: Item[];
};

type Actions = {
  addItem: (title: string) => void;
  removeItem: (id: string) => void;
  toggleItemStatus: (id: string) => void;
};

const createItem = (title = ""): Item => ({
  id: uuidv4(),
  title: title.trim(),
  status: ItemStatus.Incomplete,
  dateCreated: new Date(),
});

const toggleItemStatus = (status: ItemStatus): ItemStatus => {
  return status === ItemStatus.Incomplete
    ? ItemStatus.Done
    : ItemStatus.Incomplete;
};

const useStore = create(
  persist(
    immer<State & Actions>((set) => ({
      items: [],
      addItem: (title = "") => {
        return set((state) => {
          state.items.push(createItem(title));
        });
      },
      toggleItemStatus: (id: string) => {
        return set((state) => {
          const item = state.items.find((item) => {
            return item.id === id;
          });

          if (!item) return;

          item.status = toggleItemStatus(item.status);
        });
      },
      removeItem: (id: string) => {
        return set((state) => ({
          items: state.items.filter((item) => {
            return item.id !== id;
          }),
        }));
      },
    })),
    {
      name: "todo-store",
    }
  )
);

export default useStore;
