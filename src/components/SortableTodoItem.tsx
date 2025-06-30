import {
    useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDeleteTodoMutation } from "../store/useDeleteTodoMutation";
import type { Todo } from "../types/todo";




export default function SortableTodoItem({ todo }: { todo: Todo }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),

    }

    const deleteTodoMutation = useDeleteTodoMutation()

    const handleDelete = (todoId: number) => {
        if (confirm("Are you sure you want to delete this todo?")) {
            deleteTodoMutation.mutate(todoId)
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-move ${isDragging ? 'opacity-50 scale-105' : ''
                }`}
        >
            <div className="flex-1">
                <p className="font-medium text-gray-800">{todo.description}</p>
                <p className="text-sm text-gray-600 mt-1">
                    Status: <span className="capitalize">{todo.status}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Created: {new Date(todo.time).toLocaleDateString()}
                </p>
            </div>
            <button
                onClick={() => handleDelete(todo.id)}
                disabled={deleteTodoMutation.isPending}
                className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors "
            >
                {deleteTodoMutation.isPending ? "Deleting..." : "Delete"}
            </button>
        </div>
    )
}