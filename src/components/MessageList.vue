<!-- eslint-disable vetur/validation -->
<!-- eslint-disable vetur/validation -->
<template>
  <div class="container">
    <div class="row vh-6">
      <div class="col">
        <MessageListTitle :title="room.name" />
      </div>
    </div>
    <div class="row bg-cloud-knoxville vh-92">
      <div id="chat-list-div"
        ref="chat"
        class="chat-list-div col-12 w-100 overflow-auto" style="height: 90%;">
        <MessageListMessage v-for="(message, index) in messages" :key="message.user + index"
          :message="message.data"
          :external="message.external"
          :nickname="message.user"
          />
      </div>
      <div class="col-12 w-100 pt-2" style="height: 10%;">
        <MessageListInput />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MessageListInput from './MessageListInput.vue';
import MessageListMessage from './MessageListMessage.vue';
import MessageListTitle from './MessageListTitle.vue';

@Component({
  data() {
    return {
      chatDiv: null,
    };
  },
  components: {
    MessageListTitle,
    MessageListInput,
    MessageListMessage,
  },
  computed: {
    room() {
      return this.$store.getters.getSelectedRoom;
    },
    messages() {
      setTimeout(() => {
        if (this.$data.chatDiv !== null) {
          const chatDiv = this.$refs.chat as HTMLElement;
          chatDiv.scrollTop = chatDiv?.scrollHeight ?? 0;
        }
      }, 10);

      return this.$store.getters.getMessages;
    },
  },
  mounted() {
    this.$data.chatDiv = this.$refs.chat;
  },
})

export default class MessageList extends Vue {}
</script>

<style scoped>
.vh-92 {
  height: 92.2vh !important;
}

.vh-6 {
  height: 5.7vh !important;
}

.bg-cloud-knoxville {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
</style>
