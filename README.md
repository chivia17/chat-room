# Chat Room

## About
This chat room application is built with Vue.js, TypeScript, BootstrapVue, and Socket.IO. It allows users to:

* Join and create rooms
* Send and receive messages
* Receive notifications when someone joins a room
* Leave rooms
* Search text in a chat
* Get the message history of a room


## Table of Contents
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [How it works](#how-it-works)
    - [Enter the chat application](#enter-the-chat-application)
    - [Rooms list](#rooms-list)
    - [To join a room](#to-join-a-room)
    - [Someone joins a room](#someone-joins-a-room)
    - [To send a message](#to-send-a-message)
    - [Receive messages](#receive-messages)
    - [To search text on chat](#to-search-text-on-chat)
    - [To leave a room](#to-leave-a-room)
    - [Filter rooms](#filter-rooms)
- [Support](#support)
- [License](#license)

## Requirements

- NodeJS >= v19.4.0
- npm (Node.js package manager)

## Getting started

To install the chat room application, follow these steps:

1. Clone the repository:

```bash
$ git clone https://github.com/chivia17/chat-room
```

2. Install the dependencies:
```bash
$ cd chat-room
$ npm install
```

3. Start the development server:
```bash
$ npm run serve
```

>**NOTE**
>
> To use this chat room application, you need to run the API that is available at https://github.com/chivia17/chat-room-api. Instructions on how to run the API can be found in the same repository.

## How it works

To use the chat room application, open http://localhost:8080 in a web browser. You can then join or create a room and start chatting.

### Enter the chat application

To enter the application, choose a nickname and click the "Enter Chat" button. You will be redirected to the home page, where you can see the chat rooms.
![Alt text](/examples/1-login.png "Select nickname")

### Rooms list

The room list is divided into two sections:

* My rooms: These are the rooms that you have already joined.
* Discover rooms: These are rooms that you can join.

![Alt text](/examples/2-Home.png "Room list")

### To join a room

To join a room, simply click the "Join" button. The room will then appear in the "My rooms" section. To start chatting, simply click on the room.

![Alt text](/examples/3-Join.png "Join room")

![Alt text](/examples/4-Select.png "Select room")

### Someone joins a room

If someone joins a room that you are joined, you will receive a notification.

![Alt text](/examples/5-Notification.png "Notification")

### To send a message

To send a new message, simply type the message and press Enter or click the Send button.

![Alt text](/examples/6-FirstMessage.png "Send message")

### Receive messages

When you have selected a room, you can see messages from other users in real time.

![Alt text](/examples/7-NewMemberMesssage.png)

![Alt text](/examples/8-Chat.png "Chat")

### To search text on chat

To search for a message in a chat, select the dropdown menu in the top right corner of the chat and click the "Search" option. This will open a modal where you can type the message you want to search for. Once you click the "Search" button, the chat will scroll to the message.

![Alt text](/examples/9-SearchMessage.png "Search message")

![Alt text](/examples/10-SearchResult.png "Search result")

### New room

To create a new room, click the "+" button in the left search bar. This will open a modal where you can type the room name, description, and whether the room is private. Once you have filled in all the data, click the "Save" button. The new room will appear in the "My rooms" section.

![Alt text](/examples/13-NewRoom.png "New room")

![Alt text](/examples/14-AfterNewRoom.png "New room in list")

![Alt text](/examples/14-SelectNewRoom.png "Select new room")

### To leave a room

To leave a room, select the dropdown menu in the top right corner of the room and click the "Leave" option.

![Alt text](/examples/11-LeaveRoom.png "Leave room")

![Alt text](/examples/12-AfterLeave.png "Update room list")

> Note: Once you leave a room, you will no longer receive messages or notifications for that room.

### Filter rooms

You can search for a room by typing its name in the top left search bar.

![Alt text](/examples/15-FilterChats.png "Filter room")

## Support

If you need help with the chat room API, please contact us at: https://github.com/chivia17

## License

The chat room API is licensed under the MIT license.
