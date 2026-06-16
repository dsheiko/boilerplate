<template>
  <tr>
    <td>{{ person.name }}</td>
    <td>{{ person.gender }}</td>
    <td>{{ person.height }}</td>
    <td>{{ person.eyeColor }}</td>
    <td>{{ person.birthYear }}</td>
  </tr>
</template>

<script setup>
defineProps({
  person: {
    type: Object,
    required: true
  }
});
</script>
