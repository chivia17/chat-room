import Vue from 'vue';
import Vuex from 'vuex';
import { io, Socket } from 'socket.io-client';
import AxiosClient from '@/helpers/AxiosClient';
import { NewRoom, RoomDocument } from '@/Types/Room';
import { MessageChat, MessageDocument } from '@/Types/Message';

Vue.use(Vuex);

interface ChatState {
  socket: Socket | null;
  axiosClient: AxiosClient;
  nickname: string;
  userId: string;
  myRooms: Array<RoomDocument>;
  rooms: Array<RoomDocument>;
  selectedRoom: RoomDocument;
  chats: Map<string, Array<MessageChat>>;
  messages: Array<MessageChat>;
  roomFilter: string;
}

interface Acknowledge {
  status: string;
  message: string;
}

function handleChatMessage(
  messages: Array<MessageChat> | undefined,
  userId: string,
  message: MessageDocument,
) {
  if (messages !== undefined) {
    messages.push({
      userId: message.userId,
      user: message.nickname,
      data: message.message,
      external: userId !== message.userId,
    });

    return messages;
  }

  return [];
}

export default new Vuex.Store({
  state: {
    socket: null,
    axiosClient: new AxiosClient(),
    nickname: '',
    userId: '',
    myRooms: [],
    rooms: [],
    selectedRoom: {} as RoomDocument,
    chats: new Map(),
    messages: [],
    roomFilter: '',
  },
  getters: {
    socket(state: ChatState): Socket | null {
      return state.socket;
    },
    userId(state: ChatState): string {
      return state.userId;
    },
    getRooms(state: ChatState): Array<RoomDocument> {
      let { rooms } = state;

      if (state.roomFilter !== '') {
        // eslint-disable-next-line max-len
        rooms = rooms.filter((room: RoomDocument) => room.name.toLowerCase().includes(state.roomFilter.toLowerCase()));
      }

      return rooms;
    },
    getMyRooms(state: ChatState): Array<RoomDocument> {
      let { myRooms } = state;

      if (state.roomFilter !== '') {
        // eslint-disable-next-line max-len
        myRooms = myRooms.filter((room: RoomDocument) => room.name.toLowerCase().includes(state.roomFilter.toLowerCase()));
      }

      return myRooms;
    },
    getSelectedRoom(state: ChatState): object {
      return state.selectedRoom;
    },
    getMessages(state: ChatState) {
      return state.messages;
    },
  },
  mutations: {
    CONNECT_CHAT(state): void {
      state.socket = io(process.env.VUE_APP_SOCKET_URL);
    },
    DISCONNECT_CHAT(state): void {
      state.socket?.disconnect();
    },
    SET_USER_ID(state): void {
      state.userId = state.socket?.id as string;
    },
    SET_NICKNAME(state, nickname): void {
      state.nickname = nickname;
    },
    SET_ROOMS(state, rooms): void {
      state.rooms = rooms;
    },
    SET_MY_ROOMS(state, rooms): void {
      state.myRooms = rooms;
    },
    SET_SELECTED_ROOM(state, room): void {
      state.selectedRoom = room;
    },
    SET_ROOM_ID(state, roomId): void {
      state.chats.set(roomId, []);
    },
    SET_NEW_MESSAGE(state, message) {
      const messages = handleChatMessage(state.chats.get(message.room), state.userId, message);
      state.chats.set(message.room, messages);
    },
    UPDATE_MESSAGE(state, roomId): void {
      state.messages = state.chats.get(roomId) ?? [];
    },
    SET_HISTORY_MESSAGE(state, messages): void {
      state.chats.set(state.selectedRoom.roomId, messages);
    },
    SET_ROOM_FILTER(state, roomFilter): void {
      state.roomFilter = roomFilter;
    },
  },
  actions: {
    connect({ commit }) {
      commit('CONNECT_CHAT');
    },
    addUser({ state, commit }, username) {
      state.socket?.emit('new-user', { nickname: username });
      commit('SET_USER_ID');
      commit('SET_NICKNAME', username);
    },
    joinRoom({ state, dispatch }, idRoom) {
      state.socket?.emit('join', { room: idRoom, nickname: state.nickname }, (ack: Acknowledge) => {
        if (ack.status === 'success') {
          dispatch('getRooms');
          dispatch('getMyRooms');
        }
      });
    },
    hearMessages({ state, commit }) {
      state.socket?.on('message', (message: MessageDocument) => {
        if (message) {
          if (!state.chats.has(message.room)) {
            commit('SET_ROOM_ID', message.room);
          }

          commit('SET_NEW_MESSAGE', message);

          if (message.room === state.selectedRoom.roomId) {
            commit('UPDATE_MESSAGE', message.room);
          }
        }
      });
    },
    hearErrors({ state }) {
      state.socket?.on('error', (message) => {
        console.log(message);
      });
    },
    async newRoom({ state, dispatch }, roomData: NewRoom) {
      try {
        const roomId = await state.axiosClient.saveRoom(roomData);

        dispatch('joinRoom', roomId);
      } catch (error) {
        console.error(error);
      }
    },
    async getRooms({ state, commit }) {
      try {
        const rooms = await state.axiosClient.getRooms(state.userId);

        commit('SET_ROOMS', rooms);
      } catch (error) {
        console.error(error);
        commit('SET_ROOMS', []);
      }
    },
    async getMyRooms({ state, commit }) {
      try {
        const rooms = await state.axiosClient.getMyRooms(state.userId);

        commit('SET_MY_ROOMS', rooms);
      } catch (error) {
        commit('SET_MY_ROOMS', []);
      }
    },
    async selectRoom({ commit, dispatch }, room) {
      commit('SET_SELECTED_ROOM', room);
      await dispatch('getChatHistory');
      commit('UPDATE_MESSAGE', room.roomId);
    },
    sendMessage({ state, commit }, message) {
      state.socket?.emit('message', {
        room: state.selectedRoom.roomId,
        message,
        nickname: state.nickname,
      });

      if (!state.chats.has(state.selectedRoom.roomId)) {
        commit('SET_ROOM_ID', state.selectedRoom.roomId);
      }

      const newMessage = {
        room: state.selectedRoom.roomId,
        message,
        userId: state.userId,
        nickname: state.nickname,
      };

      commit('SET_NEW_MESSAGE', newMessage);
      commit('UPDATE_MESSAGE', newMessage.room);
    },
    leaveRoom({ state, dispatch, commit }) {
      state.socket?.emit('leave', { room: state.selectedRoom.roomId, nickname: state.nickname }, (ack: Acknowledge) => {
        if (ack.status === 'success') {
          commit('SET_SELECTED_ROOM', {});
          commit('UPDATE_MESSAGE', '');
          dispatch('getRooms');
          dispatch('getMyRooms');
        }
      });
    },
    async getChatHistory({ state, commit }) {
      try {
        const history = await state.axiosClient.getChatHistory(state.selectedRoom.roomId);

        const messages = history.map((message) => ({
          userId: message.userId,
          user: message.nickname,
          data: message.data,
          external: state.userId !== message.userId,
        }));

        commit('SET_HISTORY_MESSAGE', messages);
      } catch (error) {
        console.error(error);
      }
    },
    filterRooms({ commit }, roomToSearch) {
      commit('SET_ROOM_FILTER', roomToSearch);
    },
  },
  modules: {
  },
});
