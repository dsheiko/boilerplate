<script>
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Row from "./Row.svelte";
  import { people, fetchPeople } from "../store/index.js";

  onMount( () => {
    fetchPeople();
  } );
</script>

<Header />
<div class="paper">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Height</th>
        <th>Eye Color</th>
        <th>Birth Year</th>
      </tr>
    </thead>
    <tbody>
      {#each $people as person (person.name)}
        <Row {person} />
      {/each}
    </tbody>
  </table>
</div>

<style>
  .paper {
    margin: 24px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: Roboto, sans-serif;
  }

  th {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 2px solid #e0e0e0;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
  }
</style>
