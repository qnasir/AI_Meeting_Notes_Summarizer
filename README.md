# 📝 AI Transcript Summarizer  

A lightweight web app that allows users to upload transcripts (meeting notes, call logs, etc.), apply a custom prompt, and generate structured AI-powered summaries. The summaries can be **edited** and **shared via email** directly from the app.  

---

## 🚀 Features  

- 📂 **Upload Transcript**: Upload plain text files (e.g., `.txt`) containing transcripts or notes.  
- ✍️ **Custom Prompt**: Enter your own instructions (e.g., *“Summarize for executives”* or *“Highlight only action items”*).  
- ⚡ **AI-Powered Summary**: Generate a structured summary instantly using an AI model.  
- 🖊 **Editable Summaries**: Modify the generated summary before finalizing.  
- 📧 **Email Sharing**: Share the summary with multiple recipients by entering email addresses.  
- 🎯 **Minimal UI**: Built with focus on **functionality over design**.  

---

## 🛠 Tech Stack  

- [Vite](https://vitejs.dev/) – Next-gen build tool for fast dev experience  
- [React](https://react.dev/) – UI library for building components  
- [TypeScript](https://www.typescriptlang.org/) – Type-safe development  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  
- [shadcn/ui](https://ui.shadcn.com/) – Accessible UI components  

---

## 📂 Project Structure  

```bash
├── src
│   ├── components   # UI components (upload, editor, email form, etc.)
│   ├── pages        # Main app pages
│   ├── hooks        # Custom hooks
│   ├── utils        # Helper functions (AI API calls, email service, etc.)
│   └── App.tsx      # Root component
├── public           # Static assets
├── package.json
└── README.md
