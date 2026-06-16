<script setup lang="ts">
import { DesktopOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <a-layout-header :style="{ display: 'flex', alignItems: 'center' }">
    <a class="logo">
      <desktop-outlined />
    </a>
    <div :style="{ color: 'white' }">
      John Doe
      <a-divider type="vertical" />
      <a>logout</a>
    </div>
  </a-layout-header>
</template>
