<template>
  <div class="container-fluid">
    <b-form-group
      id="input-group-room-name"
      label="Room name"
      label-for="new-room-name">
      <b-form-input
        id="new-room-name"
        v-model="room.name"
        type="text"
        required>
      </b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-room-description"
      label="Room description"
      label-for="new-room-description">
      <b-form-input
        id="new-room-description"
        v-model="room.description"
        type="text"
        required>
      </b-form-input>
    </b-form-group>
    <b-form-checkbox v-model="room.visibility" class="pt-2">
      Private room
    </b-form-checkbox>
    <b-button class="w-100 mt-2"
      variant="primary"
      block
      @click="saveRoom">Save</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  data() {
    return {
      room: {
        name: '',
        description: '',
        visibility: false,
        userId: '',
      },
    };
  },
  methods: {
    async saveRoom() {
      await this.$store.dispatch('newRoom', this.$data.room);
      this.$bvModal.hide('new-room-modal');
    },
  },
  mounted() {
    this.$data.room.userId = this.$store.getters.userId;
  },
})

export default class NewRoom extends Vue {}
</script>
