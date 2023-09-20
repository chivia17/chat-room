export interface NewRoom {
  name: string;
  visibility: boolean;
  description: string;
  userId: string;
}

export interface RoomDocument {
  roomId: string;
  name: string;
  description: string;
  totalUsers: number;
  userInRoom: number;
  private: boolean;
  active: boolean;
  owner: string;
  users: Array<string>;
}
