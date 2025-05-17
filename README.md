# Land Auction Web Application

![Land Auction Demo](demo.gif) <!-- Optional: Add a demo GIF/screenshot later -->

A modern land auction platform built with **Spring Boot** (backend) and **React** (frontend). This open-source project provides a foundation for managing online land auctions with real-time bidding capabilities.

## ✨ Why This Project?

- Simplifies the land auction process with geospatial visualization (Leaflet maps)
- Demonstrates real-time bidding using WebSockets (Socket.IO)
- Provides a complete reference implementation with:
  - JWT authentication
  - Form validation
  - Modern UI components (Material-UI + TailwindCSS)
- Serves as a base project for real estate or government auction systems

## 🚀 Technology Stack

### Backend (Spring Boot 2.7)
- Java 17
- Spring Security (JWT Authentication)
- Spring Data JPA + SQLite database
- Socket.IO (Real-time bidding)
- Validation API
- Lombok

### Frontend (React 17)
- Vite (Build tool)
- Material-UI v5 + TailwindCSS
- React Leaflet (Map visualization)
- React Router v5
- Date-fns (Date handling)
- Axios (HTTP client)

## 🛠️ Setup & Running Steps

### Prerequisites
- Java JDK 17+
- Node.js 16+
- SQLite (Embedded, no separate installation needed)
- Maven

### Backend Setup
```bash
git clone https://github.com/TusharTalmale/Land-Auction.git
cd backend

# Run with Maven
mvn spring-boot:run
```
### Frontend Setup
```
cd frontend
npm install
npm run dev
```
The application will be available at:
- Backend: http://localhost:4000
- Frontend: http://localhost:3000

## 🌟 Key Features
- User authentication (JWT)
- Land listing with map visualization (Leaflet)
- Real-time bidding (Socket.IO)
- Form validation
- Responsive UI (Material-UI + TailwindCSS)
- Date/time handling (date-fns)

## 🗃️ Database Configuration
The application uses embedded SQLite by default. The database file will be automatically created .

## 🤝 Contributing
We welcome contributions to this open-source project:
- Fork the repository
- Create your feature branch (git checkout -b feature/your-feature)
- Commit your changes (git commit -m 'Add some feature')
- Push to the branch (git push origin feature/your-feature)
- Open a Pull Request
Found an issue? Please report .

#### 📜 License
Distributed under the MIT License. 

#### 📬 Contact
Project Maintainer 
- tushartal2@gmail.com
- www.linkedin.com/in/tushartalmale
