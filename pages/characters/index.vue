<template>
  <div class="px-5 py-32 flex flex-col md:px-0 md:items-center">
    <div class="h-full w-full lg:w-[984px]">
      <form
        @submit.prevent="handle_search"
        class="flex items-center h-16 shadow-lg shadow-red-900/50"
      >
        <input
          class="w-full h-full px-5 bg-zinc-800 focus:outline-none rounded-l-lg"
          type="search"
          id="name"
          name="name"
          autocomplete="off"
          placeholder="Procure por um personagem..."
          v-model="search_query"
        />
        <button
          type="submit"
          class="bg-zinc-800 transition ease-in-out duration-300 hover:text-red-500 hover:bg-zinc-950 text-lg h-full w-16 rounded-r-lg"
        >
          <font-awesome-icon :icon="'fa-search'" />
        </button>
      </form>
      <div
        v-if="character_list < 1"
        class="mt-10 text-lg text-center font-semibold"
      >
        Nenhum resultado.
      </div>
      <div
        v-else
        class="mt-10 grid gap-5 grid-cols-1 min-[475px]:grid-cols-2 md:grid-cols-3"
      >
        <div v-for="characters in character_list">
          <CharactersCharacterCard
            :id="characters.mal_id"
            :image="characters.images.jpg.image_url"
            :name="characters.name"
            :name_kanji="characters.name_kanji"
            :nickname="characters.nicknames"
            :about="characters.about"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const search_query = ref("");
    const character_list = ref([]);

    const handle_search = async () => {
      const data = await $fetch(
        `https://api.jikan.moe/v4/characters?q=${search_query.value}`
      );
      character_list.value = data.data;
    };

    return {
      search_query,
      character_list,
      handle_search,
    };
  },
};
</script>
