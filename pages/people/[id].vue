<template>
  <div class="py-24">
    <div class="px-5 flex flex-col md:px-0 md:items-center">
      <div class="w-full lg:w-[984px]">
        <div class="flex items-center text-lg">
          <NuxtLink
            class="flex items-center text-red-500 border-transparent border-2 p-3 rounded-xl transition duration-300 ease-in-out hover:text-red-300 hover:border-red-300"
            to="/people"
          >
            <font-awesome-icon :icon="'fa-arrow-left'" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mt-10 px-5 flex flex-col md:flex-row md:px-0 justify-center">
      <div v-if="people?.length < 1">
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
        v-for="full_people in people"
        class="flex flex-col gap-4 md:flex-row h-full w-full lg:w-[984px]"
      >
        <div
          class="flex flex-col flex-none gap-2 min-[510px]:flex-row md:flex-col md:w-[300px]"
        >
          <img
            class="rounded-xl object-cover w-full h-[400px] min-[400px]:h-[600px] min-[510px]:h-[425px] shadow-lg shadow-red-900/50"
            :src="full_people.images.jpg.image_url"
            :alt="full_people.name + ' image'"
          />
          <div class="flex flex-col gap-2 w-full">
            <div
              class="flex gap-2 justify-around px-1 py-2 rounded-lg bg-zinc-950"
            >
              <div class="text-lg md:text-xl flex flex-col text-center">
                <h3>Favoritos</h3>
                <div v-if="full_people?.favorites">
                  <font-awesome-icon :icon="'fa-star'" class="text-red-500" />
                  {{ formatSearch(full_people.favorites) }}
                </div>
                <span v-else>N/A</span>
              </div>
            </div>
            <div
              class="flex-col gap-2 justify-around p-2 rounded-lg bg-zinc-950 break-words min-[510px]:overflow-y-auto min-[510px]:h-[353px] md:h-fit"
            >
              <div class="flex flex-col gap-4">
                <div
                  class="border-b-[1px] border-b-red-500 pb-1 gap-2 font-bold text-lg"
                >
                  Informações
                </div>
                <div>
                  <span class="font-bold text-red-200">Nome dado</span>
                  <div v-if="full_people?.family_name.length > 0">
                    <span class="text-sm">{{ full_people.given_name }}</span>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Nome familiar</span>
                  <div v-if="full_people?.family_name.length > 0">
                    <span class="text-sm">{{ full_people.family_name }}</span>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <div>
                  <span class="font-bold text-red-200">Nomes alternativos</span>
                  <div
                    v-if="full_people?.alternate_names.length > 0"
                    v-for="alternate_names in full_people.alternate_names"
                    class="flex flex-col gap-2"
                  >
                    <span class="text-sm">{{ alternate_names }}</span>
                  </div>
                  <div v-else class="text-sm">Nada informado.</div>
                </div>
                <span class="font-bold text-red-200">Data de nascimento</span>
              </div>
              <div v-if="full_people?.birthday" class="text-sm">
                {{ formatBirthday(full_people.birthday) }}
              </div>
              <div v-else class="text-sm">Nada informado.</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <div class="font-bold">
            <h1 class="text-xl md:text-2xl">{{ full_people.name }}</h1>
            <h2 class="text-sm md:text-base text-zinc-500">
              {{ full_people.given_name }}
            </h2>
          </div>
          <div
            class="text-xl md:text-2xl border-b-[1px] border-b-red-500 font-bold pb-1 mt-4"
          >
            Sobre
          </div>
          <p v-if="full_people?.about" class="text-sm text-zinc-300 leading-6">
            {{ full_people.about }}
          </p>
          <span v-else class="text-sm text-zinc-300">Nada informado.</span>
          <div
            class="flex justify-between border-b-[1px] border-b-red-500 pb-1 mt-4"
          >
            <h1 class="text-xl md:text-2xl font-bold">Principal</h1>
          </div>
          <div class="flex flex-col sm:flex-row gap-2">
            <NuxtLink
              :to="`voices/${people_id}`"
              class="flex flex-1 items-center justify-center bg-zinc-950 rounded-lg p-2 text-lg md:text-xl font-bold transition ease-in-out duration-300 hover:text-red-500"
            >
              Dublagens
            </NuxtLink>
            <NuxtLink
              :to="`animes/${people_id}`"
              class="flex flex-1 items-center justify-center bg-zinc-950 rounded-lg p-2 text-lg md:text-xl font-bold transition ease-in-out duration-300 hover:text-red-500"
            >
              Animes
            </NuxtLink>
            <NuxtLink
              :to="`mangas/${people_id}`"
              class="flex flex-1 items-center justify-center bg-zinc-950 rounded-lg p-2 text-lg md:text-xl font-bold transition ease-in-out duration-300 hover:text-red-500"
            >
              Mangás
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [],
      people_id: "",
    };
  },
  async mounted() {
    const { id } = useRoute().params;
    this.people_id = id;
    this.loadPeople(id);
  },
  methods: {
    async loadPeople(id) {
      const data = await $fetch(`https://api.jikan.moe/v4/people/${id}/full`);
      this.people = data;
    },
    formatSearch(number) {
      const numberFormat = new Intl.NumberFormat("pt-BR");
      return numberFormat.format(number);
    },
    formatBirthday(birthday) {
      const birthdayDay = birthday.slice(8, 10);
      const birthdayMonth = birthday.slice(5, 7);
      const birthdayYear = birthday.slice(0, 4);

      return `${birthdayDay}/${birthdayMonth}/${birthdayYear}`;
    },
  },
};
</script>
