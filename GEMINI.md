# MagicNook - THE PROMPT

## 🎯 Book Buddy MVP – UX-Enhanced Prompt for Gemini

### Project Overview

You are an expert full-stack developer and UX designer creating a **free, child-friendly web app** for kids aged 9 and up called **“Book Buddy.”**

The goal is to encourage reading and help children record summaries of the books they’ve read.

---


## 🎨 Core Features

1\. **Add a Book**

- Upload or take a **book-cover photo** using the camera.

- Search or scan by **title or ISBN** using the **Open Library API** (no API key).

  

2\. **Book Details Page**

- Auto-fill **title**, **author**, and **cover** from the Open Library API.

- Display or read aloud a short description using the **Web Speech API** (text-to-speech).

  

3\. **Child’s Summary**

- The child can **type** or **record** their own book summary.

- Record voice using the **MediaRecorder API**, store the audio file in **Firebase Storage**, and link the URL in **Firestore**.

  

4\. **Personal Library Dashboard**

- Display colorful book cards with:

- Book cover

- Emoji rating (⭐️ / 😊 / 🤩)

- Short summary text or “Play Summary” audio button

- Show a **progress counter** like “You’ve read 7 books!”

- Display **badges or confetti animation** when a new book is added.

  

5\. **Accessibility**

- Use large text, high-contrast colors, and a “🔊 Read Aloud” button for summaries.

  

---

  

## 🧩 Technical Requirements

- **Frontend:** React + Vite (mobile-first design)

- **Backend / Storage:** Firebase Auth + Firestore + Storage (free tier)

- **Book API:** [Open Library API](https://openlibrary.org/developers/api)

- **Speech:** Web Speech API (for TTS)

- **Voice Recording:** MediaRecorder API (for audio summaries)

- **Icons / UI:** Material Icons CDN + emoji elements

- **Hosting:** Netlify or Vercel (free tier)

- **No paid services or analytics.**

  

---

  

## 🧰 Deliverables

- Fully working React app with:

- Components: AddBook, BookCard, BookList, AudioRecorder, SummaryReader.

- Services: FirebaseConfig, OpenLibraryAPI, FirestoreService, StorageService.

- Sample Firebase config (with placeholders for keys).

- Code examples for:

- Uploading/previewing cover images

- Fetching book metadata (Open Library API)

- Reading text aloud (Web Speech API)

- Recording and uploading voice summaries (MediaRecorder API + Firebase Storage)

- Displaying animated badges/confetti when a book is added.

- Responsive UI optimized for tablets and phones.

- A **README.md** with:

- Setup instructions

- Firebase setup steps

- Local run commands (`npm install`, `npm run dev`)

- Deploying to Vercel or Netlify.

  

---

  

## ✨ UX & Visual Guidelines

- Big, colorful cards with clear one-button actions (“Read Summary”, “Add Note”, “Badge”).

- Emoji ratings and progress counter.

- Large “Add Book” button with camera icon (📸).

- Playful mascot image and confetti animation when a book is added.

- Accessible layout with high contrast and large touch targets.

  

---

  

## 🧒 Safety & Privacy

- Store only a child’s nickname and book data (no personal identifiers).

- Audio summaries should be private to the account owner.

- No external tracking or analytics tools.

  

---

  

## ✅ Task for Gemini

Generate:

- The **React source code** for the MVP (organized in components / services folders).

- A **README.md** with setup steps and Firebase instructions.

- CSS or Tailwind styles to match a friendly children’s UI.

- Inline comments explaining each major function for learning purposes.

  

---

  

## 💡 Usage Tips

1\. Run in **Gemini Advanced** or **Gemini 1.5 Pro**.

2\. If prompted for clarification, answer:

- “Use Open Library API only (no keys) and Firebase Free Tier for Auth, Firestore, and Storage.”

3\. For modular structure, you can add:

- “Organise code into components under `/src/components`, services under `/src/services`, and hooks under `/src/hooks` folders.”

  
---

