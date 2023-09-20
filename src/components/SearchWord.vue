<template>
  <div class="container-fluid">
    <b-form-group
      id="input-group-room-name"
      label="Message to search"
      label-for="new-room-name">
      <b-form-input
        id="new-room-name"
        v-model="message"
        type="text"
        required>
      </b-form-input>
    </b-form-group>
    <b-button class="w-100 mt-2"
      variant="primary"
      block
      @click="searchWord">Search</b-button>
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
  methods: {
    async searchWord() {
      const searchMessage = this.$data.message;
      const chat = document.getElementById('chat-list-div') as HTMLElement;
      const messages = chat.getElementsByTagName('span');

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        if (message.textContent?.trim().toLowerCase() === searchMessage.trim().toLowerCase()) {
          message.scrollIntoView({ behavior: 'smooth' });
          this.$bvModal.hide('search-word');
          break;
        }
      }
    },
  },
})

export default class SearchWord extends Vue {}
</script>
