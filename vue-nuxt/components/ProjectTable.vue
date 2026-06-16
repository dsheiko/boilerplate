<script setup lang="ts">
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import type { TableColumnsType } from "ant-design-vue";
import { remove } from "~/utils/api";
import { PAGE_PROJECTS } from "~/utils/constants";

const queryClient = useQueryClient();

const mutation = useMutation( {
  mutationFn: ( id: number ) => remove( PAGE_PROJECTS, id ),
  onSuccess: () => queryClient.invalidateQueries( { queryKey: [ PAGE_PROJECTS ] } ),
} );

const columns: TableColumnsType = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Environment",
    dataIndex: "env",
    sorter: true,
  },
  {
    title: "Action",
    key: "action",
  },
];
</script>

<template>
  <UiTable :columns="columns" :collection="PAGE_PROJECTS">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <NuxtLink :to="`/projects/${ record.id }`">Edit</NuxtLink>
        <a-divider type="vertical" />
        <a-popconfirm
          placement="topRight"
          title="Are you sure to delete this record?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="mutation.mutate( record.id )"
        >
          <a href="#">Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </UiTable>
</template>
