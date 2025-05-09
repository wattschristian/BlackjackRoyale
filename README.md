# BlackjackRoyale
Full-stack MEAN application that allows users to play the popular card game Blackjack against a computer dealer.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14 or higher)  
- **npm** or **Yarn** package manager  
- **MongoDB** instance (local or remote)  

## Getting Started
Follow these steps to download, install, and run the application on your local machine.


### 1. Clone the Repository
```bash
git clone https://github.com/your-username/BlackjackRoyale.git
```

### Install Dependencies
```bash
cd client 
npm install
npm install chart.js@4.x
npm install ng2-charts

cd ../server
npm install
```

### Configuration
#### Create a .env file in the server directory to store environment variables
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Replace placeholder values with your own credentials

### Run server 
```bash
node server.js
```
The server will start on http://localhost:5000 by default

### Navigate to client and start Angular frontend
```bash
cd ../client
ng serve
```

## Enjoy Blackjack Royale!
