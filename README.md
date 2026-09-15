# 🎯 Placement Preparation Guide

A full-stack web application designed to help students prepare for campus placements through aptitude learning, practice tests, and an AI-powered ATS-friendly resume checker.

---

## 📌 About the Project

**Placement Preparation Guide** is a student-focused placement preparation platform that brings multiple placement preparation resources into one application.

The platform allows students to:

- Create an account and log in
- Learn different aptitude topics
- Read aptitude theory and examples
- Practice aptitude questions
- Take practice/mock tests
- Check their resume using an AI-powered ATS resume checker
- Submit feedback
- Contact the placement support team

The main goal of the project is to provide students with a simple and centralized platform for placement preparation.

---

## ✨ Features

### 👤 User Authentication
- Student registration
- Student login
- Username and password validation
- Department and academic year selection

### 🧮 Aptitude Preparation
- Quantitative Aptitude topics
- Topic-wise learning
- Theory and explanations
- Examples
- Practice questions
- Mock/practice tests

### 🤖 AI-Powered Resume Checker
- Upload/provide resume information
- AI-based resume analysis
- ATS-friendly resume checking
- Suggestions for improving the resume

### 📝 Feedback & Contact
- Students can submit feedback
- Contact form for queries and suggestions

### 🗄️ Database
- Student information stored in MongoDB
- Aptitude topics stored in MongoDB
- Feedback and contact information stored in MongoDB

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### AI
- AI API Integration
- AI-powered ATS Resume Checker

### APIs & Communication
- REST APIs
- Fetch API
- JSON

### Tools
- Git
- GitHub
- VS Code

---

## 🏗️ Project Structure

```text
Placement-Preparation-Guide/
│
├── Frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── aptitude.html
│   ├── mocktest.html
│   ├── feedback.html
│   ├── contact.html
│   ├── style.css
│   └── script.js
│
├── Backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── AptitudeTopic.js
│   │   ├── Feedback.js
│   │   └── contact.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── aptitudeTopics.js
│   │   ├── feedbackRoutes.js
│   │   ├── contactRoutes.js
│   │   └── aiRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── README.md
