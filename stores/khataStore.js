import { create } from 'zustand';

const useCustomersStore = create((set) => ({
  Customers: [],
  setCustomers: (newCustomers) => set({ Customers: newCustomers }),

  filteredCustomers: null,
  setFilteredCustomers: (newCustomers) => set({ filteredCustomers: newCustomers }),

  allItems: [],
  setAllItems: (newItems) => set({ allItems: newItems }),

  filteredItems: null,
  setFilteredItems: (newItems) => set({ filteredItems: newItems }),

  SeletedTempItems: [],
  setPrevSeletedTempItems: (newItems) => set({ SeletedTempItems: newItems }),

  setSeletedTempItems: (newItem) => {
    set((state) => {
      const existingItemIndex = state.SeletedTempItems.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex === -1) {
        return { SeletedTempItems: [...state.SeletedTempItems, newItem] };
      } else {
        const updatedItems = [...state.SeletedTempItems];
        updatedItems[existingItemIndex] = newItem;
        return { SeletedTempItems: updatedItems };
      }
    });
  },
  setSeletedTempItemsToNull: () => set({ SeletedTempItems: [] }),

  SeletedCustomer: [],
  setSeletedCustomer: (newCustomer) => set({ SeletedCustomer: newCustomer }),

  allLogs: [],
  setAllLogs: (newLogs) => set({ allLogs: newLogs }),

  editlogData: [],
  setEditlogData: (data) => set({ editlogData: data }),
}));


export default useCustomersStore;
