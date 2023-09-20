<template>
  <div class="row pt-2 pb-2">
    <div class="col-4 d-none d-md-block">
      <b-avatar variant="success" icon="people-fill" align-self="center"></b-avatar>
    </div>
    <div class="col-8 text-start">
      <div class="container">
        <div class="row fw-bold">
          <div class="col">
            {{name}}
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span class="mr-auto">{{description}}</span>
          </div>
        </div>
        <div  v-if="showJoin" class="row">
          <div class="col-12">
            <b-button @click="joinRoom"
            variant="outline-primary">
              Join
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  methods: {
    async joinRoom() {
      this.$store.dispatch('joinRoom', this.$props.idRoom);
    },
  },
})

export default class RoomLisItem extends Vue {
  @Prop() private idRoom!: string;

  @Prop() private name!: string;

  @Prop() private description!: string;

  @Prop() private showJoin!: boolean;
}
</script>
