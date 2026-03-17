# Monochrome · B&W Chat

A minimal **black & white encrypted chat** app built with **Node.js**, **Express**, and **Socket.IO**. All messages are encrypted client-side using **AES-GCM**. No colors, no gradients — strictly monochrome.

---

## Features

- Real-time chat with multiple rooms
- End-to-end message encryption (AES-GCM)
- Live user list per room
- Auto-reconnect using localStorage
- Fully black & white UI

---

## Tech Stack

- **Backend:** Node.js, Express, Socket.IO, get-port, crypto  
- **Frontend:** Vanilla JS, HTML, CSS  
- **Encryption:** Web Crypto API (AES-GCM)  

---

## Installation

1. Clone the repo:
git clone https://github.com/DzaaXLife/BnW-chat.git
cd monochrome-chat

2. Install dependencies:
npm install

3. Run the server:
node index.js

Server will start on a random port between `3000-3100`.

---

## Usage

1. Open your browser and go to `http://localhost:<PORT>`
2. Enter a **username** and **room name**
3. Start chatting in real-time with encrypted messages
4. Click `info` to see current users
5. Click `leave` to exit the room

---

## File Structure
/public        # Frontend HTML, CSS, JS index.js       # Server & Socket.IO logic README.md      # Project info

---

## Security Notes

- Messages are encrypted client-side using AES-GCM.
- The server never sees decrypted messages.
- Room keys are randomly generated per room session.

---

## License

MIT License