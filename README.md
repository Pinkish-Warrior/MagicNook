# 📚 MagicNook - Book Buddy

A free, child-friendly web application built with React and Firebase to encourage reading and allow children to record and track summaries of the books they've read.

## ✨ Core Features

* **Book Search:** Find books quickly by Title or ISBN using the **Open Library API**.
* **Voice Summaries:** Record summaries using the **MediaRecorder API** and store them in **Firebase Storage**.
* **Read Aloud:** Hear book descriptions and summaries using the **Web Speech API (TTS)**.
* **Personal Library:** A colorful dashboard showing progress and book cards.
* **Gamification:** Confetti/Badge animations upon adding a new book!

## 🚀 Getting Started

Follow these steps to set up and run the Book Buddy MVP locally.

### 1. Prerequisites

* Node.js (LTS version recommended)
* npm (Node Package Manager) or yarn

### 2. Firebase Project Setup

Book Buddy uses Firebase for authentication, database, and file storage (free tier).

1. **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Add a Web App:** In your project, click the `</>` icon to add a web app.
3. **Get Configuration:** Firebase will provide a configuration object (`apiKey`, `projectId`, etc.).
4. **Update `firebaseConfig.js`:** Open `src/services/firebaseConfig.js` and replace the placeholder values with your new configuration:

    ```javascript
    // src/services/firebaseConfig.js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY", // <--- UPDATE THIS
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // <--- UPDATE THIS
      projectId: "YOUR_PROJECT_ID", // <--- UPDATE THIS
      // ... rest of config
    };
    ```

5. **Enable Firebase Services:**

    * **Authentication:** Go to **Build -> Authentication**, click **Get started**, and enable the **Anonymous** sign-in provider.
    * **Firestore Database:** Go to **Build -> Firestore Database**, click **Create database**, and start in **test mode** (for quick setup).
    * **Cloud Storage:** Go to **Build -> Storage**, click **Get started**, and set up the default bucket.

### 3. Local Installation

Clone the repository and install dependencies.

```bash
# Clone the project (assuming this is a Git repository)
git clone 
cd book-buddy-mvp

# Install dependencies (React, Firebase, etc.)
npm install
# OR
# yarn install
```

npm install firebase

npm install -g firebase-tools

---

## 📝 Project Documentation

For more detailed information about the project, see the following documents:

* **[Next Steps](./Next_Steps.md):** A list of proposed future improvements and feature ideas.

* **[Deployment Guide](./DEPLOYMENT.md):** Step-by-step instructions for deploying the application.
