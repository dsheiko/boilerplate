import { create } from "zustand";

export const usePeopleStore = create((set) => ({
  people: [],
  fetchPeople: async () => {
    const json = await fetch("/people.json").then(rsp => rsp.json());
    set({ people: json.results });
  }
}));
