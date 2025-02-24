# 🎮 CTRL+PLAY

![Capture d'écran 2025-02-21 153018](https://github.com/user-attachments/assets/b49b89aa-bd48-4248-86ee-2ac1909bc747)

## 📖 Table of Contents  
- [Introduction](#-introduction)  
- [Prerequisites](#-prerequisites)  
- [Installation & Usage](#-installation--usage)  
- [Database Setup](#-database-setup)  
- [Architecture](#-architecture) 
- [Project Structure](#-project-structure)     
- [Development Workflow](#-development-workflow)  
- [Best Practices](#-best-practices)  
- [Deployment](#-deployment)  
- [Contributing](#-contributing)  
- [License](#-license)  

---

## 🚀 Introduction  

**CTRL+PLAY** is a platform that consolidates a user's games across multiple platforms and provides personalized recommendations based on genres, tags, and devices added to their library. Users can browse the library to add games, mark favorites, or create a wishlist. Additionally, they can import their Steam games using their Steam ID to integrate them into their library, enhancing recommendations.  

### Features:  
✅ Consolidate games from multiple platforms into one library  
✅ Get personalized recommendations based on game metadata  
✅ Add games to favorites or a wishlist  
✅ Import Steam games using a Steam ID  
✅ Secure authentication and data protection  
✅ A customizable interface for managing game collections  
✅ A comment and rating system  
✅ Secure user authentication  

### 🛠 Tech Stack  
- **Frontend:** React, TypeScript, Vite  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Testing:** Supertest  
- **Code Quality Tools:** Biome (Linting & Formatting)  

---

## 📋 Prerequisites  

Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (latest stable version)  
- [MySQL](https://www.mysql.com/)  
- [Docker (optional)](https://www.docker.com/)  
- [Git](https://git-scm.com/)  

For Windows users, configure Git to avoid newline issues:  
```sh
 git config --global core.eol lf
 git config --global core.autocrlf false
```

---

## ⚡ Installation & Usage  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/bilal-augereau/Ctrlplay.git
cd Ctrlplay
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Setup Environment Variables  
Create `.env` files in both `server/` and `client/` directories. You can copy the provided `.env.sample` files as templates.  

#### Example `.env` for Backend (`server/.env`):  
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=db_crtl_play
```

#### Example `.env` for Frontend (`client/.env`):  
```env
VITE_API_URL=http://localhost:3310
```

### 4️⃣ Run the Project  

Start both the backend and frontend simultaneously:  
```sh
npm run dev
```

To start them individually:  
```sh
# Start the backend
cd server
npm run dev

# Start the frontend
cd ../client
npm start
```

---

## 🗄️ Database Setup  

### 1️⃣ Run Database Migrations  
Synchronize the database schema using:  
```sh
npm run db:migrate
```

### 2️⃣ Seed the Database  
Populate the database with initial data using:  
```sh
npm run db:seed
```

Ensure that the `.env` file is correctly set up before running these commands.

---

## 📂 Architecture  

```mermaid
sequenceDiagram
    box Web Client
    participant React as React
    participant Fetcher as Fetcher
    end
    box Web Server
    participant Express as Express
    participant Module as Module
    end
    box DB Server
    participant DB as MySQL Server
    end

    React-)Fetcher: event
    activate Fetcher
    Fetcher-)Express: request (HTTP)
    activate Express
    Express-)Module: call
    activate Module
    Module-)DB: SQL query
    activate DB
    DB--)Module: data
    deactivate DB
    Module--)Express: json
    deactivate Module
    Express--)Fetcher: HTTP response
    deactivate Express
    Fetcher--)React: render
    deactivate Fetcher
```

---

## 📂 Project Structure  

```plaintext
my-project/
│
├── server/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── item/
│   │   │   │   ├── itemActions.ts
│   │   │   │   └── itemRepository.ts
│   │   │   └── ...
│   │   ├── app.ts
│   │   ├── main.ts
│   │   └── router.ts
│   ├── database/
│   │   ├── client.ts
│   │   └── schema.sql
│   ├── tests/
│   ├── .env
│   └── .env.sample
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.tsx
    ├── .env
    └── .env.sample
```

---

## 🏗 Development Workflow  

### 🚦 Running Linting & Formatting  
```sh
npm run check-types
```

### 🧪 Running Tests  
```sh
npm run test
```

---

## 🔒 Best Practices  

- Always validate and sanitize user input.  
- Use HTTPS for secure communications.  
- Store passwords securely with Argon2.  
- Follow SOLID principles for maintainable code.  

---

## 🚀 Deployment  

To deploy the application using Docker:  
```sh
docker compose up --build
```

For manual deployment, ensure your environment variables are set correctly and run:  
```sh
npm run build
npm run start
```

---

## 🤝 Contributing  

We welcome contributions! To contribute:  
1. Fork this repository.  
2. Clone your fork.  
3. Create a new branch:  
   ```sh
   git switch -c feature/your-feature-name
   ```
4. Commit your changes:  
   ```sh
   git commit -m "Add new feature"
   ```
5. Push to your branch:  
   ```sh
   git push origin feature/your-feature-name
   ```
6. Open a **Pull Request**.  

---

## 📜 License  

This project is licensed under the **MIT License**.  
