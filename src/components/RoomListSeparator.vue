<template>
  <div class="row bg-blue-gradient text-white ft-bold py-2">
    <div class="col">
      {{title}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RoomListSeparator extends Vue {
  @Prop() private title!: string;
}
</script>

<style scoped>
.bg-blue-gradient {
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
}
</style>
