/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageHistory } from '@/Types/Message';
import { NewRoom } from '@/Types/Room';
import axios, { Axios } from 'axios';

export default class AxiosClient {
  private axiosClient : Axios;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
    });
  }

  /**
   * Get room list
   * @param {string} userId - User ID
   * @returns - Room list
   */
  async getRooms(userId: string) {
    try {
      const reponse = await this.axiosClient.get(`/room/availables?userId=${userId}`);

      return reponse.data.rooms;
    } catch (error: any) {
      console.error(error.message);
      throw Error(error.message);
    }
  }

  /**
   * Get rooms that user is enrolled
   * @param {string} userId - User ID
   * @returns - Room list
   */
  async getMyRooms(userId: string) {
    try {
      const reponse = await this.axiosClient.get(`/room/enrolled?userId=${userId}`);

      return reponse.data.rooms;
    } catch (error: any) {
      console.error(error.message);
      throw Error(error.message);
    }
  }

  /**
   * Save new room
   * @param {NewRoom} roomData - New room data
   * @returns {string} - New Room ID
   */
  async saveRoom(roomData: NewRoom): Promise<string> {
    try {
      const newRoom = {
        name: roomData.name,
        visibility: roomData.visibility,
        description: roomData.description,
        userId: roomData.userId,
      };

      const reponse = await this.axiosClient.post('/room/new', newRoom);

      return reponse.data.roomId;
    } catch (error: any) {
      console.error(error.message);
      throw Error(error.message);
    }
  }

  /**
   * Get chat history
   * @param {string} roomId - Room ID
   * @returns {Array<MessageHistory>} - Chat history of specific room
   */
  async getChatHistory(roomId: string) : Promise<Array<MessageHistory>> {
    try {
      const reponse = await this.axiosClient.get(`/room/history?roomId=${roomId}`);

      return reponse.data.messages;
    } catch (error: any) {
      console.error(error.message);
      throw Error(error.message);
    }
  }
}
