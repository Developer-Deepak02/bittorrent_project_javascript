# 📦 BitTorrent Client in JavaScript

A custom-built BitTorrent client written in JavaScript, implementing the BitTorrent protocol from scratch. This project is part of a hands-on learning initiative to understand how torrenting works at the protocol level.

## 🔍 Features

- ✅ Parse `.torrent` files (BEncoding decoding)
- ✅ Connect to HTTP/UDP trackers
- ✅ Peer discovery and handshake
- ✅ Peer wire protocol (request, piece, choke, unchoke)
- ✅ Piece downloading and assembly
- ❌ No GUI – CLI-based learning project

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)

 💡 Learnings
This project helped me understand:

How BitTorrent manages file sharing without a central server

Binary protocols and buffer handling in Node.js

Asynchronous event handling with sockets

🔗 Inspired By
CodeCrafters BitTorrent Challenge

BitTorrent Protocol Specification

📂 Folder Structure
bash
Copy
Edit
.
├── bencode/              # Bencoding decoder
├── tracker/              # Tracker communication
├── peer/                 # Peer wire protocol handling
├── torrent-parser.js     # Torrent file parsing
├── index.js              # Entry point
└── README.md


## 🚀 Installation

Follow these steps to install and run the BitTorrent client locally.

### 🧰 Requirements

- [Node.js](https://nodejs.org/) (version 18 or higher)
- A `.torrent` file (e.g., Ubuntu ISO torrent)

---

### 📦 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/bittorrent-javascript.git

# 2. Navigate into the project directory
cd bittorrent-javascript

# 3. Install all dependencies
npm install

# 4. Run the client with a .torrent file
node index.js <path-to-torrent-file>

📁 Output
The downloaded file will be saved in your current working directory under the filename defined in the .torrent metadata.
