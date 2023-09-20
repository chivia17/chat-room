<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <div class="login container">
      <div class="row pt-5">
        <div class="offset-md-3 col-md-6">
          <img alt="Vue logo" width="200" height="200" src="../assets/icon-login.jpeg">
          <p>
            Welcome to the chat room! To join, please enter a nickname.
            Your nickname will be visible to everyone in the chat room,
            so choose one that you're comfortable with.
          </p>
          <b-form-group label="Nickname" label-for="nickname">
            <b-form-input id="nickname"
              v-model="nickname"
              class="mt-3">
            </b-form-input>
          </b-form-group>
          <b-button type="button"
            variant="primary"
            class="mt-3"
            @click="register">
            Enter Chat
          </b-button>
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
      nickname: '',
    };
  },
  methods: {
    register() {
      this.$store.dispatch('addUser', this.$data.nickname);

      this.$router.push('/chat');
    },
  },
  created() {
    this.$store.dispatch('connect');
  },
})

export default class LoginView extends Vue {}
</script>
