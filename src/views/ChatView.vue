<template>
  <div class="container-fluid vh-100">
    <div class="row vh-100">
      <div class="room-list col-4 vh-100 overflow-auto p-0 pt-3">
        <RoomList />
      </div>
      <div class="col-8 vh-100 overflow-auto p-0 pt-3">
        <MessageList />
      </div>
    </div>

    <b-modal id="new-room-modal" title="New Room" hide-footer hide-header-close>
      <NewRoom />
    </b-modal>
  </div>
</template>

<script lang="ts">
import RoomList from '@/components/RoomList.vue';
import MessageList from '@/components/MessageList.vue';
import { Component, Vue } from 'vue-property-decorator';
import NewRoom from '@/components/NewRoom.vue';
import { NotificationDocument } from '@/Types/Notification';

@Component({
  data() {
    return {
      messages: [],
      notification: {} as NotificationDocument,
    };
  },
  created() {
    this.$store.dispatch('hearMessages');
    this.$store.dispatch('hearErrors');
    this.$store.getters.socket.on('notification', (notification: NotificationDocument) => {
      this.$data.notification = notification;
    });
  },
  components: {
    RoomList,
    MessageList,
    NewRoom,
  },
  watch: {
    notification(newValue) {
      this.$toast.info(newValue.description, {
        timeout: 2000,
      });
    },
  },
})

export default class ChatView extends Vue {}
</script>

<style>
.room-list::-webkit-scrollbar {
  display: none;
}
</style>
