<template>
  <NuxtLink :to="`/producers/${id}`" class="flex flex-col relative group p-1">
    <div class="flex flex-col">
      <div
        class="absolute break-words top-0 left-0 right-0 h-full bg-black p-2 opacity-0 group-hover:opacity-90 duration-300"
      >
        <div class="mt-5 flex flex-col gap-2 w-full">
          <span v-if="favorite" class="flex items-center gap-1 font-bold"
            >{{ formatNumber(favorite) }}
            <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
          </span>
          <span v-else>Nada informado.</span>
          <div class="flex flex-col">
            <span v-if="count" class="text-zinc-400 text-xs"
              >{{ formatNumber(count) }} Titles</span
            >
            <span v-else class="text-zinc-400 text-xs">Nada informado.</span>
          </div>
          <p v-if="about" class="text-sm line-clamp-5">
            {{ about }}
          </p>
          <p v-else class="text-sm line-clamp-5">Descrição não disponível.</p>
        </div>
      </div>
      <img
        class="object-cover w-full h-[300px] min-[360px]:h-[225px] min-[475px]:h-[325px] rounded-xl shadow-lg shadow-red-900/50"
        :src="image"
        :alt="title[0] + ' logo'"
      />
    </div>
    <div class="flex flex-wrap gap-1 my-4">
      <div
        v-for="titles in title"
        class="p-2 flex items-center justify-center text-red-200 border-red-500 border-2 rounded-3xl"
      >
        <span class="text-xs">{{ titles.title }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    id: Number,
    image: String,
    favorite: Number,
    count: Number,
    title: Array,
    about: String,
  },
  methods: {
    formatNumber(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
  },
};
</script>
