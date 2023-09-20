<template>
  <div class="row bg-white text-black ft-bold py-4">
    <div class="col">
      {{title}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RoomListEmptyList extends Vue {
  @Prop() private title!: string;
}
</script>
