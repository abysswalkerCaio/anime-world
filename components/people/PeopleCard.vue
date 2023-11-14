<template>
  <NuxtLink :to="`/people/${id}`" class="flex flex-col relative group">
    <div class="flex flex-col">
      <div
        class="absolute break-words w-full h-full top-0 left-0 right-0 bg-zinc-950 p-2 font-bold description-anime opacity-0 group-hover:opacity-90 duration-300"
      >
        <div class="mt-5 flex flex-col gap-2 w-full">
          <span v-if="favorite" class="flex items-center gap-1"
            >{{ formatFavorites(favorite) }}
            <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
          </span>
          <span v-else>Nada informado.</span>
          <p v-if="about" class="text-xs line-clamp-5">
            {{ about }}
          </p>
          <p v-else class="text-xs line-clamp-5">Descrição não disponível.</p>
        </div>
      </div>
      <img
        class="object-cover w-full h-[400px] min-[360px]:h-[325px] min-[475px]:h-[425px] rounded-xl shadow-lg shadow-red-900/50"
        :src="image"
        :alt="name + ' photo'"
      />
    </div>
    <div class="flex flex-wrap gap-1 my-4">
      <div
        v-for="alternate_names in alternate_name"
        class="p-2 flex items-center justify-center text-red-200 border-red-500 border-2 rounded-3xl"
      >
        <span class="text-xs">{{ alternate_names }}</span>
      </div>
    </div>
    <h1 class="text-xl min-[360px]:text-lg min-[475px]:text-xl font-bold">
      {{ name }}
    </h1>
    <h2
      class="text-zinc-500 font-bold min-[360px]:text-sm min-[475px]:text-base"
    >
      {{ given_name }}
    </h2>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    id: Number,
    image: String,
    name: String,
    given_name: String,
    favorite: Number,
    about: String,
    alternate_name: Array,
  },
  methods: {
    formatFavorites(favorites) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(favorites);
    },
  },
};
</script>
