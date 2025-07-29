<template>
  <div>
    <div class="card-group">
      <ClothingModelComposer>  </ClothingModelComposer>
    </div>

  </div>
</template>

<script>
import ClothingModelComposer from '../AITryonCompents/ClothingModelComposer.vue';
export default {
  name: 'AITryon',
  components: {
    ClothingModelComposer
  },
  data() {
    return {
      
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

</style>
