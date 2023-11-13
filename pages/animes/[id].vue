<template>
   <div class="flex items-center justify-center text-4xl">In development...</div>
</template>

<script>
export default {
  mounted() {
    const { id } = useRoute().params
    console.log(id)
  }
}
</script>