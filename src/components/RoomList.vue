<template>
  <div class="container-fluid px-0">
    <RoomListSearch />
    <RoomListSeparator title="My rooms" class="mt-2"/>
    <RoomListEmptyList v-if="myRooms.length === 0" title="Empty list" />
    <b-list-group>
      <b-list-group-item
        class="container-fluid border-0 p-0 py-2 border-bottom list-group-item-hover cursor-pointer"
        :class="roomActive === room.roomId? 'list-group-item-active' : ''"
        v-for="room in myRooms" :key="room.roomId"
        @click="selectRoom(room)">
        <RoomLisItem :idRoom="room.roomId"
          :name="room.name"
          :description="room.description"
          :showJoin="false"/>
      </b-list-group-item>
    </b-list-group>
    <RoomListSeparator title="Discover rooms" />
    <RoomListEmptyList v-if="rooms.length === 0" title="Empty list" />
    <b-list-group>
      <b-list-group-item
        class="container-fluid border-0 p-0 border-bottom list-group-item-hover"
        v-for="room in rooms" :key="room.roomId">
        <RoomLisItem :idRoom="room.roomId"
          :name="room.name"
          :description="room.description"
          :showJoin="true" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RoomListEmptyList from './RoomListEmptyList.vue';
import RoomLisItem from './RoomListItem.vue';
import RoomListSearch from './RoomListSearch.vue';
import RoomListSeparator from './RoomListSeparator.vue';

@Component({
  data() {
    return {
      roomToSearch: '',
      isAddButtonHovered: false,
      roomActive: '',
    };
  },
  components: {
    RoomListSeparator,
    RoomLisItem,
    RoomListSearch,
    RoomListEmptyList,
  },
  computed: {
    rooms() {
      return this.$store.getters.getRooms;
    },
    myRooms() {
      return this.$store.getters.getMyRooms;
    },
  },
  async created() {
    await this.$store.dispatch('getRooms');
    await this.$store.dispatch('getMyRooms');
  },
  methods: {
    handleHoverAdd(hovered) {
      this.$data.isAddButtonHovered = hovered;
    },
    selectRoom(room) {
      this.$data.roomActive = room.roomId;
      this.$store.dispatch('selectRoom', room);
    },
  },
})

export default class RoomList extends Vue {}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.list-group-item-hover:hover {
  background-color: #e6e6e6;
}

.list-group-item-active {
  background-color: #e6e6e6;
}
</style>
