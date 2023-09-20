export interface MessageDocument {
  room: string;
  message: string;
  userId: string;
  nickname: string;
}

export interface MessageChat {
  userId: string;
  user: string;
  data: string;
  external: boolean;
}

export interface MessageHistory {
  data: string;
  date: string;
  userId: string;
  nickname: string;
  type: string;
  _id: string;
}
