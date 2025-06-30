# 📝 React Drag & Drop Todo List

A modern, full-featured Todo List app built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **dnd-kit**. This app supports drag-and-drop reordering, status changes by dragging to screen edges, language toggle (English/Persian), and persistent state with React Query.

---

## 🚀 Features

- **Add, delete, and reorder todos**
- **Drag & drop** to reorder items within a status
- **Change status** by dragging items to the left/right edge of the screen:
  - **Todo → Right:** Move to In Progress
  - **In Progress → Right:** Mark as Completed
  - **In Progress → Left:** Back to Todo
  - **Completed → Left:** Back to In Progress
- **Language toggle:** Switch between English and Persian for UI tips
- **Beautiful UI:** Responsive, accessible, and mobile-friendly
- **Persistent state:** Uses React Query for state management
- **Unit tested:** With Jest and React Testing Library

---

## 🛠️ Getting Started

### 1. **Clone the repository**
```sh
git clone <your-repo-url>
cd to-do-list
```

### 2. **Install dependencies**
```sh
npm install
```

### 3. **Run the development server**
```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧑‍💻 Usage

### **Add a Todo**
- Click the green "+ Add Todo" button.
- Fill in the description and select a status.
- Click **Add Todo** to save.

### **Reorder Todos**
- Drag any todo up or down to change its order within the current status.

### **Change Status by Dragging**
- **Drag right**: Todo → In Progress, In Progress → Completed
- **Drag left**: In Progress → Todo, Completed → In Progress
- The status will update automatically based on the drag direction and current status.

### **Delete a Todo**
- Click the red **Delete** button on any todo item.

### **Language Toggle**
- Use the **فارسی / ENGLISH** button in the tips section to switch between Persian and English instructions.

---

## 🏗️ Project Structure

```
to-do-list/
├── src/
│   ├── components/         # React components (TodoList, AddTodoModal, etc)
│   ├── store/              # React Query hooks and state logic
│   ├── types/              # TypeScript types
│   ├── mockapi/            # Mock data (JSON)
│   ├── index.css           # Tailwind CSS imports
│   └── App.tsx             # Main app component
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```

---

## 🧪 Running Tests

```sh
npm test
```
- Tests are written with **Jest** and **React Testing Library**.
- Example: `src/components/__tests__/AddTodoModal.test.tsx` covers modal behavior and cache updates.

---

## ✨ Key Technologies
- React 19 + TypeScript
- Vite
- Tailwind CSS
- dnd-kit (drag & drop)
- React Query
- Jest & React Testing Library

---

## 📄 License
MIT

---

## 🙏 Credits
- [dnd-kit](https://dndkit.com/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Testing Library](https://testing-library.com/)

---

**Enjoy your productive, modern, and multilingual Todo List!**
