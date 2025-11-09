# TREE

```plaintext
book-buddy-mvp/
├── public/
│   ├── index.html
│   └── book-buddy-mascot.png
├── src/
│   ├── components/
│   │   ├── AddBook.jsx           // Handles book search, camera, upload
│   │   ├── BookCard.jsx          // Displays book in the library
│   │   ├── BookList.jsx          // Main library view
│   │   ├── AudioRecorder.jsx     // MediaRecorder implementation
│   │   ├── SummaryReader.jsx     // Web Speech API TTS
│   │   └── ConfettiBadge.jsx     // Animation component
│   ├── services/
│   │   ├── firebaseConfig.js     // Firebase initialization
│   │   ├── OpenLibraryAPI.js     // Book fetching logic
│   │   ├── FirestoreService.js   // Firestore CRUD operations
│   │   └── StorageService.js     // Firebase Storage operations
│   ├── styles/
│   │   └── App.css               // Global styles
│   ├── App.jsx                   // Main component and routing (simple state management)
│   └── main.jsx                  // React entry point
└── README.md
```
