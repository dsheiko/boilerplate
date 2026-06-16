<template>
  <a-layout class="container-root">
    <AppNavbar />
    <a-layout class="container-main">
      <AppSidebar />
      <a-layout class="container-content">
        <a-layout-content class="content">
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
