<script>
  let { person } = $props();
</script>

<tr>
  <td>{ person.name }</td>
  <td>{ person.gender }</td>
  <td>{ person.height }</td>
  <td>{ person.eyeColor }</td>
  <td>{ person.birthYear }</td>
</tr>

<style>
  td {
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
  }

  tr:hover td {
    background-color: #f5f5f5;
  }
</style>
