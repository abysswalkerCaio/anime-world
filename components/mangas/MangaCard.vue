<template>
  <NuxtLink :to="`/mangas/${id}`" class="flex flex-col relative group p-1">
    <div class="flex flex-col">
      <div
        class="absolute break-words w-full h-full top-0 left-0 right-0 bg-black p-2 description-anime opacity-0 group-hover:opacity-90 duration-300"
      >
        <div class="mt-5 flex flex-col gap-2 w-full">
          <span class="font-bold">{{ title }}</span>
          <span
            v-if="score && scored_by"
            class="flex items-center gap-1 font-bold"
            >{{ score }}
            <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
            ({{ formatReviews(scored_by) }})
          </span>
          <span v-else class="font-bold">Não avaliado.</span>
          <div class="flex flex-col">
            <span v-if="chapter" class="text-zinc-400 text-xs"
              >{{ chapter }} Chapters</span
            >
            <span v-else class="text-zinc-400 text-xs">Nada informado.</span>
            <span v-if="volume" class="text-zinc-400 text-xs"
              >{{ volume }} Volumes</span
            >
            <span v-else class="text-zinc-400 text-xs">Nada informado.</span>
          </div>
          <p v-if="synopsis" class="text-sm line-clamp-5">
            {{ synopsis }}
          </p>
          <p v-else class="text-sm line-clamp-5">Sinopse não disponível.</p>
        </div>
      </div>
      <img
        class="object-cover w-full h-[400px] min-[360px]:h-[325px] min-[475px]:h-[425px] rounded-xl shadow-lg shadow-red-900/50"
        :src="image"
        :alt="title + ' poster'"
      />
    </div>
    <div class="flex flex-wrap gap-1 my-4">
      <div
        v-for="genres in genre"
        class="p-2 flex items-center justify-center text-red-200 border-red-500 border-2 rounded-3xl"
      >
        <span class="text-xs">{{ genres.name }}</span>
      </div>
    </div>
    <h1 class="text-xl min-[360px]:text-lg min-[475px]:text-xl font-bold">
      {{ title }}
    </h1>
    <h2
      class="text-zinc-500 font-bold min-[360px]:text-sm min-[475px]:text-base"
    >
      {{ title_japanese }}
    </h2>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    id: Number,
    image: String,
    title: String,
    score: Number,
    scored_by: Number,
    chapter: Number,
    volume: Number,
    title_japanese: String,
    genre: Array,
    synopsis: String,
  },
  methods: {
    formatReviews(review) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(review);
    },
  },
};
</script>
