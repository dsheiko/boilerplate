<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { get, add, update } from "~/utils/api";
import { PAGE_PROJECTS } from "~/utils/constants";

interface Props {
  projectId: number | undefined;
}

const props = defineProps<Props>();
const emit = defineEmits<{ ( e: "close" ): void }>();

const queryClient = useQueryClient();

const form = ref( {
  name: "",
  env: "",
} );

const mutation = useMutation( {
  mutationFn: async ( values: { name: string; env: string } ) => {
    if ( props.projectId ) {
      await update( PAGE_PROJECTS, props.projectId, values );
    } else {
      await add( PAGE_PROJECTS, values );
    }
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries( { queryKey: [ PAGE_PROJECTS ] } );
    emit( "close" );
  },
} );

const { data, isLoading, error } = useQuery( {
  queryKey: computed( () => [ PAGE_PROJECTS, props.projectId ] ),
  queryFn: () => get( PAGE_PROJECTS, props.projectId as number ),
  enabled: computed( () => !!props.projectId ),
} );

watch( data, ( val ) => {
  if ( val ) {
    form.value = { name: val.name ?? "", env: val.env ?? "" };
  }
} );

function onSubmit() {
  mutation.mutate( form.value );
}

function onKeyDown( e: KeyboardEvent ) {
  if ( e.key === "Enter" ) {
    e.preventDefault();
    onSubmit();
  }
}
</script>

<template>
  <a-alert
    v-if="mutation.isError.value"
    message="Error"
    :description="mutation.error.value?.message"
    type="error"
    style="margin-bottom: 12px"
  />
  <a-alert
    v-if="error"
    message="Error"
    :description="( error as Error ).message"
    type="error"
    style="margin-bottom: 12px"
  />
  <a-spin :spinning="isLoading || mutation.isPending.value" tip="Loading...">
    <a-form
      :model="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      style="max-width: 600px"
      @finish="onSubmit"
    >
      <a-form-item
        label="User name"
        name="name"
        :rules="[{ required: true, message: 'Field is required' }]"
      >
        <a-input v-model:value="form.name" @keydown="onKeyDown" />
      </a-form-item>

      <a-form-item
        label="Environment"
        name="env"
        :rules="[{ required: true, message: 'Field is required' }]"
      >
        <a-select v-model:value="form.env">
          <a-select-option value="test">test</a-select-option>
          <a-select-option value="stage">stage</a-select-option>
          <a-select-option value="live">live</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>
