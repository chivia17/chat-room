<template>
  <div class="container">
    <div class="row text-start">
      <div class="col-11">
        <h2>{{title}}</h2>
      </div>
      <div class="col-1">
        <div class="h2 mb-0">
          <b-dropdown v-if="roomSelected"
            slot="dropdown-menu">
            <b-dropdown-item @click="leaveRoom">Leave room</b-dropdown-item>
            <b-dropdown-item @click="$bvModal.show('search-word')">Search</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>

    <b-modal id="search-word" title="Search" hide-footer hide-header-close>
      <SearchWord />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SearchWord from './SearchWord.vue';

@Component({
  components: {
    SearchWord,
  },
  computed: {
    roomSelected() {
      const room = this.$store.getters.getSelectedRoom;
      return !!room.roomId;
    },
  },
  methods: {
    leaveRoom() {
      this.$store.dispatch('leaveRoom');
    },
  },
})
export default class MessageListTitle extends Vue {
  @Prop() private title!: string;
}
</script>
