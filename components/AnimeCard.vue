<template>
  <div class="flex flex-col">
    <img class="flex-none object-cover h-[400px] rounded-xl" :src="image" />
    <h1 class="text-xl font-bold">{{ title }}</h1>
    <span class="font-semibold">{{ status }}</span>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
    status: String,
  },
};
</script>
