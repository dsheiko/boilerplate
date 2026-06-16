<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { PlusOutlined } from "@ant-design/icons-vue";
import type { TableColumnsType } from "ant-design-vue";
import type { TableData } from "~/utils/type";
import { getList } from "~/utils/api";

interface Props {
  columns: TableColumnsType;
  collection: string;
}

const props = defineProps<Props>();

const getQuery = ref( "" );

const pagination = ref( {
  current: 1,
  pageSize: 10,
  total: 0,
} );

const { data, isLoading, error } = useQuery<TableData>( {
  queryKey: computed( () => [ props.collection, getQuery.value ] ),
  queryFn: () => getList( props.collection + getQuery.value ),
  staleTime: 1000 * 3,
} );

watch( () => data.value?.total, ( total ) => {
  if ( total !== undefined ) {
    pagination.value.total = total;
  }
} );

function normalizeOrder( txt: string | null = null ): string | null {
  if ( !txt ) {
    return null;
  }
  return txt.toLowerCase() === "ascend" ? "ASC" : "DESC";
}

function handleTableChange( pag: any, _filters: any, sorter: any ) {
  const { current = 1, pageSize = 10 } = pag;
  pagination.value = { ...pagination.value, current, pageSize };

  const sortOrder = Array.isArray( sorter ) ? sorter[ 0 ]?.order : sorter?.order;
  const sortField = Array.isArray( sorter ) ? sorter[ 0 ]?.field : sorter?.field;

  const params: Record<string, string> = {};
  if ( current ) { params.current = String( current ); }
  if ( pageSize ) { params.pageSize = String( pageSize ); }
  const normalizedOrder = normalizeOrder( sortOrder ?? null );
  if ( normalizedOrder ) { params.sortOrder = normalizedOrder; }
  if ( sortField ) { params.sortField = String( sortField ); }

  const qs = new URLSearchParams( params );
  getQuery.value = qs.toString() ? `?${ qs.toString() }` : "";
}
</script>

<template>
  <a-alert
    v-if="error"
    message="Error"
    :description="( error as Error ).message"
    type="error"
    style="margin-bottom: 12px"
  />
  <a-table
    :sticky="true"
    :loading="isLoading"
    :columns="columns"
    :pagination="pagination"
    :data-source="data ? data.rows : []"
    @change="handleTableChange"
  >
    <template #bodyCell="slotProps">
      <slot name="bodyCell" v-bind="slotProps" />
    </template>
    <template #footer>
      <div class="table-footer-btns">
        <NuxtLink :to="`/${ collection }/0`">
          <a-button>
            <plus-outlined />
            Add record
          </a-button>
        </NuxtLink>
      </div>
    </template>
  </a-table>
</template>
