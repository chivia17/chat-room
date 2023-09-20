<template>
  <div class="container-fluid">
    <div class="search row align-middle">
      <div class="col-11">
        <b-form-input v-model="roomToSearch"
          placeholder="Search">
        </b-form-input>
      </div>
      <div class="col-1 d-flex justify-content-center">
        <div class="h2 mb-0" v-b-hover="handleHoverAdd">
          <b-icon-plus-circle :class="isAddButtonHovered ? 'plus-button-hover' : 'plus-button'"
            @click="$bvModal.show('new-room-modal')">
          </b-icon-plus-circle>
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
      roomToSearch: '',
      isAddButtonHovered: false,
    };
  },
  methods: {
    handleHoverAdd(hovered) {
      this.$data.isAddButtonHovered = hovered;
    },
  },
  watch: {
    roomToSearch(newValue) {
      this.$store.dispatch('filterRooms', newValue);
    },
  },
})

export default class RoomListSearch extends Vue {}
</script>

<style scoped>
.plus-button {
  color: #085faa;
}

.plus-button-hover {
  color: #085598;
  cursor: pointer;
}
</style>
