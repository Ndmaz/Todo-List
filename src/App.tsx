import { useState, useEffect } from "react"
import { Status, type Todo } from "./types/todo"
import { useGetTodosQuery } from "./store/useGetTodosQuery"
import TodoList from "./components/TodoList"
import AddTodoModal from "./components/AddTodoModal"

export default function App() {
  const { data: todos = [], isLoading, error } = useGetTodosQuery()

  const [Todotoshow, setTodotoshow] = useState<Todo[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPersian, setIsPersian] = useState(false)

  // Update Todotoshow when todos data is loaded
  useEffect(() => {
    if (todos.length > 0) {
      setTodotoshow(todos.filter((todo) => todo.status === Status.todo))
    }
  }, [todos])

  function handletodochange(stat: Status) {
    setTodotoshow(todos.filter((todo) => todo.status === stat))
  }

  // Handle todos changes from drag and drop
  const handleTodosChange = (newTodos: Todo[]) => {
    setTodotoshow(newTodos)
  }

  // D&D tips in both languages
  const tips = isPersian
    ? {
      title: '💡 نکات کشیدن و رها کردن:',
      desc: 'آیتم‌ها را بالا/پایین بکشید تا مرتب شوند. برای تغییر وضعیت، به چپ/راست بکشید:',
      items: [
        '• <strong>تودو ← راست:</strong> انتقال به در حال انجام',
        '• <strong>در حال انجام ← راست:</strong> علامت‌گذاری به عنوان تکمیل‌شده',
        '• <strong>در حال انجام ← چپ:</strong> بازگشت به تودو',
        '• <strong>تکمیل‌شده ← چپ:</strong> بازگشت به در حال انجام',
      ],
    }
    : {
      title: '💡 Drag & Drop Tips:',
      desc: 'Drag items up/down to reorder. Drag left/right to change status:',
      items: [
        '• <strong>Todo → Right:</strong> Move to In Progress',
        '• <strong>In Progress → Right:</strong> Mark as Completed',
        '• <strong>In Progress → Left:</strong> Back to Todo',
        '• <strong>Completed → Left:</strong> Back to In Progress',
      ],
    }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-lg">Loading todos...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">Error loading todos</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Todo List
        </h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => handletodochange(Status.todo)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
          >
            📝 Todo
          </button>
          <button
            onClick={() => handletodochange(Status.in_progress)}
            className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white rounded-lg hover:from-fuchsia-600 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
          >
            ⚡ In Progress
          </button>
          <button
            onClick={() => handletodochange(Status.completed)}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
          >
            ✅ Completed
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Todos ({Todotoshow.length})</h2>

          {/* Drag and Drop Instructions */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md" dir= {isPersian ? 'rtl' : 'ltr'}>
            <div className="flex justify-between items-center mb-2" >
              <p className="text-sm text-blue-800 font-bold">{tips.title}</p>
              <button
                onClick={() => setIsPersian((prev) => !prev)}
                className="px-3 py-1 text-xs bg-blue-200 text-blue-900 rounded hover:bg-blue-300 transition"
              >
                {isPersian ? 'ENGLISH' : 'فارسی'}
              </button>
            </div>
            <p className="text-sm text-blue-800 mb-1">{tips.desc}</p>
            <ul className="text-xs text-blue-700 mt-1 space-y-1">
              {tips.items.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>

          {Todotoshow.length === 0 ? (
            <p className="text-gray-500">No todos found</p>
          ) : (
            <TodoList todos={Todotoshow} onTodosChange={handleTodosChange} />
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg"
          >
            + Add Todo
          </button>
        </div>
      </div>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}


