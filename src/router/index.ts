import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import LoginView from '../views/LoginView.vue';
import ChatView from '../views/ChatView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth && (store.getters.socket === null || store.getters.userId === '')) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
