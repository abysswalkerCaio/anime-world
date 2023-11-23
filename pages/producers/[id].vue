<template>
  <div class="py-24">
    <div class="px-5 flex flex-col md:px-0 md:items-center">
      <div class="w-full lg:w-[984px]">
        <div class="flex items-center text-lg">
          <NuxtLink
            class="flex items-center text-red-500 border-transparent border-2 p-3 rounded-xl transition duration-300 ease-in-out hover:text-red-300 hover:border-red-300"
            to="/producers"
          >
            <font-awesome-icon :icon="'fa-arrow-left'" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mt-10 px-5 flex flex-col md:flex-row md:px-0 justify-center">
      <div v-if="producer?.length < 1">
        <div
          class="mt-5 flex flex-col gap-5 justify-center items-center w-full bg-clip-text text-4xl pb-4"
        >
          <font-awesome-icon
            class="text-red-500 fa-spin"
            :icon="'spinner'"
          ></font-awesome-icon>
        </div>
      </div>
      <div
        v-else
        v-for="full_producer in producer"
        class="flex flex-col gap-4 md:flex-row h-full w-full lg:w-[984px]"
      >
        <div
          class="flex flex-col flex-none gap-2 min-[510px]:flex-row md:flex-col md:w-[300px]"
        >
          <img
            class="rounded-xl object-cover w-full h-[300px] min-[400px]:h-[400px] min-[510px]:h-[325px] min-[510px]:max-w-[300px] shadow-lg shadow-red-900/50"
            :src="full_producer.images.jpg.image_url"
          />
          <div class="flex flex-col gap-2 w-full">
            <div
              class="flex gap-2 justify-around px-1 py-2 rounded-lg bg-zinc-950"
            >
              <div class="text-lg md:text-xl flex flex-col text-center">
                <h3>Favoritos</h3>
                <div v-if="full_producer?.favorites">
                  <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
                  {{ formatSearch(full_producer.favorites) }}
                </div>
                <span v-else>N/A</span>
              </div>
            </div>
            <div
              class="flex-col gap-2 justify-around p-2 rounded-lg bg-zinc-950 break-words scrollbar scrollbar-thumb-red-500 scrollbar-w-2 min-[510px]:overflow-y-auto min-[510px]:h-[253px] md:h-fit"
            >
              <div class="flex flex-col gap-4">
                <div
                  class="border-b-[1px] border-b-red-500 pb-1 gap-2 font-bold text-lg"
                >
                  Informações
                </div>
                <div>
                  <span class="font-bold text-red-200">Externo</span>
                  <div
                    v-if="full_producer?.external.length > 0"
                    v-for="external in full_producer.external"
                  >
                    <a
                      :href="external.url"
                      target="_blank"
                      class="transition ease-out duration-300 hover:text-red-500 text-sm"
                      >{{ external.name }}</a
                    >
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <div class="font-bold">
            <div class="border-b-[1px] border-b-red-500 pb-1 font-bold">
              <h1 class="text-xl md:text-2xl">
                {{ full_producer.titles[0].title }}
              </h1>
              <h2 class="text-sm md:text-base text-zinc-500">
                {{ full_producer.titles[1].title }}
              </h2>
            </div>
          </div>
          <span class="text-sm text-zinc-300"
            >{{ full_producer.count }} Titles</span
          >
          <div
            class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
          >
            Sobre
          </div>
          <p
            v-if="full_producer?.about"
            class="text-sm text-zinc-300 leading-6"
          >
            {{ full_producer.about }}
          </p>
          <span v-else class="text-sm text-zinc-300">Nada informado.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      producer: [],
      producer_id: "",
    };
  },
  async mounted() {
    const { id } = useRoute().params;
    this.producer_id = id;
    this.loadProducer(id);
  },
  methods: {
    async loadProducer(id) {
      const data = await $fetch(
        `https://api.jikan.moe/v4/producers/${id}/full`
      );
      this.producer = data;
    },
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
  },
};
</script>
