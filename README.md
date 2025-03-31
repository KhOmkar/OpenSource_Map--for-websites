# Location Tracker

A web application that allows admin/seller to register, track their locations, and helps consumers discover nearby sellers.

## 📋 Project Overview

Location Tracker is a platform initially build for farmer to consumer e-commerce website The application enables farmers to register their information and share their location, while consumers can search for farmers within a specified radius and get directions to their locations.

**E-commerce Farmer to Consumer Website**: 
```
https://github.com/Harshad-Gore/AgriEcom
```


## 🌟 Features

- **Farmer Registration**: Simple form for farmers to register their details
- **Location Tracking**: Farmers can set their location manually or use real-time GPS tracking
- **Consumer Search**: Consumers can find farmers within a specified radius (1-20km)
- **Interactive Maps**: Visualize farmer locations on interactive maps
- **Direction Routing**: Get directions from your current location to a farmer

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Tailwind CSS
- **Maps**: Leaflet.js, OpenStreetMap
- **Routing**: Leaflet Routing Machine
- **Backend**: Node.js, Express
- **Database**: MySQL

## 💻 Project Structure

The project consists of the following main components:

- `farmer-registration.html`: Registration form for farmers
- `maps.html`: Interface for farmers to set or track their location
- `map2.html`: Consumer interface to find and navigate to nearby farmers
- `server.js`: Backend server handling API requests and database operations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MySQL database
- NPM or Yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/farm-location-tracker.git
   cd farm-location-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   ```

4. Initialize the database:
   ```sql
   CREATE TABLE markers (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id VARCHAR(255) NOT NULL UNIQUE,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     role VARCHAR(50) NOT NULL,
     latitude DECIMAL(10, 8),
     longitude DECIMAL(11, 8),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. Start the server:
   ```
   npm start
   ```

6. Access the application:
   - Farmer Registration: http://localhost:3000/farmer-registration.html
   - Consumer Search: http://localhost:3000/map2.html

## 🔄 How It Works

### For Farmers:
1. Register with your details on the registration page
2. Set your farm location either by clicking on the map or using your GPS location
3. Optionally enable live tracking for real-time location updates

### For Consumers:
1. Open the Farmer Location Finder page
2. Allow location access to see your current position
3. Use the radius filter to find farmers within your desired distance
4. Click on a farmer marker to see their details
5. Use the "Route to Here" button to get directions to the farmer

## 📱 Screenshots

> 

## 🔮 Future Enhancements

- User authentication and secure login
- Farmer profiles with product listings
- Consumer reviews and ratings
- In-app messaging between farmers and consumers
- Mobile app version for iOS and Android
