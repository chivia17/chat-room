<template>
  <div class="container-fluid p-0">
    <div v-if="external" class="row text-start pt-3">
      <div class="col-12 py-3 fw-bold">
          {{nickname}}
      </div>
      <div class="col-6">
        <span class="py-3 px-2 external">{{message}}</span>
      </div>
    </div>
    <div v-else class="row text-end pt-3 pb-3">
      <div class="col-12 py-3 pr-1 fw-bold">
        {{nickname}}
      </div>
      <div class="offset-6 col-6">
        <span class="py-3 px-2 me">
          {{message}}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MessageListMessage extends Vue {
  @Prop() private message!: string;

  @Prop() private external!: boolean;

  @Prop() private nickname!: string;
}
</script>

<style>
.me {
  border-radius: 17% 17% 0% 17%;
  color: white;
  font-weight: 600;
  background-color: #8EC5FC;
  background-image: linear-gradient(288deg, #8EC5FC 0%, #E0C3FC 100%);
}

.external {
  border-radius: 0% 20% 20% 20%;
  color: black;
  font-weight: 500;
  background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);
}

span {
  display: inline-block;
  overflow-wrap: break-word;
}
</style>
