<script setup lang="ts">
import { h } from "vue";
import { ProjectOutlined } from "@ant-design/icons-vue";

const items = [
  {
    label: "Item1",
    key: "Item1",
    icon: () => h( ProjectOutlined ),
  },
];
</script>

<template>
  <a-layout-sider :width="200" :style="{ background: '#fff' }">
    <a-menu
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
      :items="items"
    />
  </a-layout-sider>
</template>
