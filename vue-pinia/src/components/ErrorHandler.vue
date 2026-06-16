<template>
  <slot v-if="!hasError" />
  <h1 v-else>Something went wrong.</h1>
</template>

<script>
export default {
  data() {
    return { hasError: false };
  },
  errorCaptured( error ) {
    console.warn(error);
    this.hasError = true;
    return false;
  }
};
</script>
