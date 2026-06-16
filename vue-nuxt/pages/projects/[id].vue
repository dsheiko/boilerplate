<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const isMounted = ref( false );
onMounted( () => { isMounted.value = true; } );

const projectId = computed( () => {
  const id = parseInt( route.params.id as string, 10 );
  if ( isNaN( id ) || id === 0 ) {
    return undefined;
  }
  return id;
} );

const title = computed( () => projectId.value ? "Edit record" : "New record" );

function onClose() {
  router.push( "/projects" );
}
</script>

<template>
  <ProjectTable />
  <a-config-provider v-if="isMounted" :theme="{ token: { motion: false } }">
    <a-modal
      :title="title"
      :open="true"
      :closable="true"
      :footer="null"
      :destroy-on-close="false"
      :force-render="true"
      @cancel="onClose"
    >
      <EditForm :project-id="projectId" @close="onClose" />
    </a-modal>
  </a-config-provider>
</template>
