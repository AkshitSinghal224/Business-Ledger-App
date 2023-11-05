import create from 'zustand';

const useCustomersStore = create((set) => ({
  Customers: [],
  setCustomers: (newCustomers) => set({ Customers: newCustomers }),

  allItems: [],
  setAllItems: (newItems) => set({ allItems: newItems }),

  SeletedTempItems: [],
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

  SeletedCustomer: [],
  setSeletedCustomer: (newCustomer) => set({ SeletedCustomer: newCustomer }),
}));


export default useCustomersStore;
