<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    const { id } = useRoute().params
    console.log(id)
  }
}
</script>