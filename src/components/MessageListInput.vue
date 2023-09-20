<template>
  <div class="container">
    <div class="row">
      <div class="col-md-11">
        <b-form-input v-if="roomSelected"
          v-model="message"
          placeholder="Write a message..."
          v-on:keyup.enter="sendMessage">
        </b-form-input>
      </div>
      <div class="col-md-1">
        <div class="h2 mb-0">
          <b-icon-cursor-fill class="send-button"
            v-if="roomSelected"
            @click="sendMessage">
          </b-icon-cursor-fill>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  data() {
    return {
      message: '',
    };
  },
  computed: {
    roomSelected() {
      const room = this.$store.getters.getSelectedRoom;
      return !!room.roomId;
    },
  },
  methods: {
    sendMessage() {
      if (this.$data.message !== '') {
        this.$store.dispatch('sendMessage', this.$data.message);
        this.$data.message = '';
      }
    },
  },
})

export default class MessageListInput extends Vue {}
</script>

<style scoped>
.send-button {
  cursor: pointer;
  color: #085faa;
}
</style>
