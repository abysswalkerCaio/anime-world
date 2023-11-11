<template>
  <NuxtLink :to="`/animes/${id}`" class="flex flex-col relative group">
    <div class="flex flex-col">
      <div
        class="absolute break-words top-0 left-0 right-0 h-full bg-black p-2 font-bold opacity-0 group-hover:opacity-90 duration-300"
      >
        <div class="mt-5 flex flex-col gap-2 w-full">
          <span>{{ title }}</span>
          <span v-if="score && scored_by" class="flex items-center gap-1"
            >{{ score }}
            <font-awesome-icon :icon="'fa-star'" class="text-red-500" /> /
            {{ formatReviews(scored_by) }}
          </span>
          <span v-else>Não avaliado.</span>
          <div class="flex flex-col">
            <span v-if="episode" class="text-zinc-400 text-xs">{{ episode }} Episodes</span>
            <span v-else class="text-zinc-400 text-xs">Nada informado.</span>
            <span v-if="duration" class="text-zinc-400 text-xs">{{ duration }}</span>
            <span v-else class="text-zinc-400 text-xs">Nada informado.</span>
          </div>
          <p v-if="synopsis" class="text-xs line-clamp-5">
            {{ synopsis }}
          </p>
          <p v-else class="text-xs line-clamp-5">Sinopse não disponível.</p>
        </div>
      </div>
      <img
        class="object-cover w-full h-[300px] min-[475px]:h-[350px] md:h-[475px] rounded-xl shadow-lg shadow-red-900/50"
        :src="image"
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
    <h1 class="text-xl font-bold">{{ title }}</h1>
    <h2 class="text-zinc-500 font-bold">{{ title_japanese }}</h2>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    score: Number,
    scored_by: Number,
    episode: Number,
    duration: String,
    image: String,
    title: String,
    title_japanese: String,
    genre: Array,
    synopsis: String,
  },
  methods: {
    formatReviews(review) {
      return review;
    },
  },
};
</script>
