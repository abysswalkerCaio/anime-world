<template>
  <div class="flex flex-col relative group">
    <div
      class="absolute flex flex-col break-words w-full h-full top-0 left-0 right-0 cursor-default bg-zinc-900 p-2 font-bold description-anime opacity-0 group-hover:opacity-90 duration-300"
    >
      <NuxtLink
        :to="`/characters/${id}`"
        class="flex justify-center items-center p-4 rounded-full self-end border-2 border-red-500 text-red-500 transition ease-in-out duration-300 hover:border-red-300 hover:text-red-300"
      >
        <font-awesome-icon
          class="text-xl saiba-mais"
          :icon="'arrow-right'"
        ></font-awesome-icon>
      </NuxtLink>
      <div class="mt-5 w-full">
        <p class="text-xs line-clamp-5">
          {{ about }}
        </p>
      </div>
    </div>
    <!-- Card -->
    <div>
      <img
        class="object-cover h-[400px] w-full rounded-xl"
        :src="image"
      />
    </div>
    <div class="flex flex-wrap gap-1 my-4">
      <div
        v-for="nicknames in nickname"
        class="p-2 flex items-center justify-center text-red-200 border-red-500 border-2 rounded-3xl"
      >
        <span class="text-xs">{{ nicknames }}</span>
      </div>
    </div>
    <h1 class="text-xl font-bold">{{ name }}</h1>
    <h2 class="text-zinc-500 font-bold">{{ name_kanji }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    image: String,
    name: String,
    name_kanji: String,
    about: String,
    nickname: Array,
  },
  methods: {},
};
</script>
