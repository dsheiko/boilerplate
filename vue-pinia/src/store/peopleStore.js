import { defineStore } from "pinia";

export const usePeopleStore = defineStore("people", {
  state: () => ({ people: [] }),
  actions: {
    async fetchPeople() {
      const json = await fetch("/people.json").then(rsp => rsp.json());
      this.people = json.results;
    }
  }
});
