# 🚀 GrowEasy AI CSV Importer

An AI-powered CSV Importer built as part of the **GrowEasy Software Developer Assignment**.

This full-stack web application enables users to upload CRM CSV files and intelligently transform them into the GrowEasy CRM format using **Google Gemini AI**. The application provides CSV preview, AI-powered field mapping, import statistics, and a responsive user interface.

---

## 🌐 Live Demo

## 🚀 Live Demo

### Frontend (Vercel)
[Live Application](https://groweasy-ai-csv-importer-f54j-inky.vercel.app)

### Backend API (Render)
[Backend API](https://groweasy-backend-5g6z.onrender.com)

> **Note**
>
> The backend is hosted on Render's free tier. The first request after inactivity may take **30–60 seconds** while the server wakes up.

---

## ✨ Features

- 🤖 AI-powered CRM field mapping using Google Gemini AI
- 📂 Drag & Drop CSV Upload
- 👀 CSV Preview before importing
- 📊 Import Summary (Total Records, Imported, Skipped)
- 📄 AI Parsed CRM Records Table
- ⚡ Batch processing for large CSV files
- 🌙 Light & Dark Mode
- 📱 Responsive and modern user interface
- 🐳 Docker support for frontend and backend
- ☁️ Deployed using Vercel and Render

---

## 🏗️ Architecture

```text
                User
                  │
                  ▼
         Next.js Frontend
                  │
          Upload CSV File
                  │
                  ▼
        Express.js Backend API
                  │
           Parse CSV Records
                  │
                  ▼
        Google Gemini AI API
                  │
        Intelligent Field Mapping
                  │
                  ▼
      Standardized CRM Records
                  │
                  ▼
      Display Results on Frontend
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Dropzone
- PapaParse
- Next Themes
- Lucide React

### Backend

- Node.js
- Express.js
- TypeScript
- Multer
- Google Gemini AI

### Deployment

- Vercel (Frontend)
- Render (Backend)

### Containerization

- Docker

---

## 📁 Project Structure

```text
groweasy-ai-csv-importer
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   ├── Dockerfile
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   ├── prompts
│   │   └── index.ts
│   ├── Dockerfile
│   └── package.json
│
└── README.md
```

---

## 🤖 AI Processing Workflow

1. Upload a CSV file.
2. The backend parses the CSV records.
3. Records are processed in batches.
4. Each batch is sent to Google Gemini AI.
5. Gemini maps the CSV fields into the GrowEasy CRM format.
6. Invalid AI responses are skipped.
7. Parsed CRM records are returned to the frontend.
8. Users can review the import summary and mapped records.

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shahpranali-12/groweasy-ai-csv-importer.git

cd groweasy-ai-csv-importer
```

---

### 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the `backend` folder.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=5000
```

Start the backend.

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

---

## 🐳 Docker

### Backend

```bash
cd backend

docker build -t groweasy-backend .

docker run -p 5000:5000 groweasy-backend
```

### Frontend

```bash
cd frontend

docker build -t groweasy-frontend .

docker run -p 3000:3000 groweasy-frontend
```

---

## 🚀 Future Improvements

- User Authentication
- Import History
- Export Mapped CSV
- Support for Multiple CRM Templates
- Progress Tracking for Large Imports
- Enhanced AI Validation
- Bulk Import Optimization

---

## 👩‍💻 Author

**Pranali Shah**

- GitHub: https://github.com/shahpranali-12

---

## 📄 License

This project was developed as part of the **GrowEasy Software Developer Assignment** for educational and evaluation purposes.
