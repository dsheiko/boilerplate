<template>
  <ErrorHandler>
    <AppHeader />
    <v-main>
      <v-container>
        <v-table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Height</th>
              <th>Eyes</th>
              <th>Birthdate</th>
            </tr>
          </thead>
          <tbody>
            <AppRow
              v-for="(person, index) in store.people"
              :key="index"
              :person="person"
            />
          </tbody>
        </v-table>
      </v-container>
    </v-main>
  </ErrorHandler>
</template>

<script setup>
import { onMounted } from "vue";
import { usePeopleStore } from "../store/peopleStore";
import AppHeader from "./Header.vue";
import AppRow from "./Row.vue";
import ErrorHandler from "./ErrorHandler.vue";

const store = usePeopleStore();

onMounted(() => {
  store.fetchPeople();
});
</script>
