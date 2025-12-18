# 🎬 Movie Review App
### *Movie Reviews Redefined | Cinematic Excellence*

Welcome to the **Movie Review App**, a premium, full-stack platform designed for cinema enthusiasts. Built with a sophisticated "Modern Brown" aesthetic, this application offers a curated experience for discovering and discussing the world's most iconic movies and series.

---

## ✨ Features

- **🟫 Modern Brown Aesthetic**: A custom-crafted design system using Coffee, Cognac, and Metallic Gold tones for a premium, high-end feel.
- **📱 Full-Screen Immersive Layout**: A responsive, edge-to-edge UI that prioritizes visual storytelling.
- **🖼️ Verified Poster Collection**: A hand-curated library of **21 iconic titles**, each featuring verified, high-resolution official posters.
- **↕️ Horizontal Interaction**: Smooth horizontal category scrolling for a native-app-like experience.
- **🛡️ Secure Authentication**: Built-in user registration and login systems to keep your reviews personal.
- **💬 Community Reviews**: Rate and review your favorite films with a dedicated community-driven interface.

---

## 🛠️ Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast Refresh, Component-based UI |
| **Styling** | Vanilla CSS | Custom "Modern Brown" design system |
| **Backend** | Django & DRF | Robust RESTful API & Data Management |
| **Database** | SQLite | Reliable relational data storage |
| **Icons** | Lucide React | Clean, scalable vector iconography |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/melody2203/Movie-Review-App.git
   cd Movie-Review-App
   ```

2. **Backend Setup**
   ```bash
   cd movie-review-backend
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   python manage.py migrate
   python config/create_test_data.py  # Seed the verified 21-movie library
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd ../movie-review-frontend
   npm install
   npm run dev
   ```

---

## 🎨 Design Philosophy

The application follows a **Modern Brown** palette:
- `Deepest Espresso` (#0f0a06) for backgrounds.
- `Cognac Gold` (#8b5a2b) for branding.
- `Glassmorphism` for headers and interactive elements.

---

## 👤 Author

**Merertu Philipose**
- [GitHub](https://github.com/melody2203)
- [LinkedIn](https://www.linkedin.com/in/merertu-philipose-631594307/)
- Email: merertuphilip@gmail.com

---

## ⚖️ License
© 2025 Merertu Philipose. All rights reserved. Built with excellence in mind.
