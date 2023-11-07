<template>
  <div class="relative text-white grid grid-rows-[1fr_120px] min-h-screen">
    <Header></Header>
    <NuxtPage />
    <Footer></Footer>
  </div>
</template>

<style>
html,
body {
  --tw-bg-opacity: 1;
  background-color: rgb(24 24 27 / var(--tw-bg-opacity));
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
