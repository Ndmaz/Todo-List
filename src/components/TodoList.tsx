import type { Todo } from "../types/todo";
import SortableTodoItem from "./SortableTodoItem";

import { useUpdateTodoMutation } from "../store/useUpdateTodoMutation";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { Status } from "../types/todo"

interface TodoListProps {
    todos: Todo[];
    onTodosChange: (newTodos: Todo[]) => void;
}

// Sortable Todo Item Component


export default function TodoList({ todos, onTodosChange }: TodoListProps) {

    const [activeTodo, setActiveTodo] = useState<Todo | null>(null)
    const updateTodoMutation = useUpdateTodoMutation()

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    function handleDragStart(event: DragStartEvent) {
        const draggedTodo = todos.find(todo => todo.id === event.active.id)
        setActiveTodo(draggedTodo || null)
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        setActiveTodo(null)

        if (!over) return

        const activeTodo = todos.find(todo => todo.id === active.id)
        if (!activeTodo) return

        // Check if dragged to screen edges (status change)
        const windowWidth = window.innerWidth
        const dragEndX = event.delta.x
        const threshold = windowWidth * 0.1 // 10% of screen width as threshold

        let newStatus = activeTodo.status

        // Status change logic based on drag direction and current status
        if (dragEndX > threshold) {
            // Dragged to right
            switch (activeTodo.status) {
                case Status.todo:
                    newStatus = Status.in_progress
                    break
                case Status.in_progress:
                    newStatus = Status.completed
                    break
                case Status.completed:
                    // Nothing happens
                    break
            }
        } else if (dragEndX < -threshold) {
            // Dragged to left
            switch (activeTodo.status) {
                case Status.todo:
                    // Nothing happens
                    break
                case Status.in_progress:
                    newStatus = Status.todo
                    break
                case Status.completed:
                    newStatus = Status.in_progress
                    break
            }
        }

        // If status changed, update the todo
        if (newStatus !== activeTodo.status) {
            const updatedTodo = { ...activeTodo, status: newStatus }
            updateTodoMutation.mutate(updatedTodo)

            // Update local state
            const newTodos = todos.map(todo =>
                todo.id === activeTodo.id ? updatedTodo : todo
            )
            onTodosChange(newTodos)
            return
        }

        // If no status change, handle reordering
        if (active.id !== over.id) {
            const oldIndex = todos.findIndex((item) => item.id === active.id)
            const newIndex = todos.findIndex((item) => item.id === over.id)

            const newTodos = arrayMove(todos, oldIndex, newIndex)
            onTodosChange(newTodos)
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    {todos.map((todo) => (
                        <SortableTodoItem key={todo.id} todo={todo} />
                    ))}
                </div>
            </SortableContext>

            <DragOverlay>
                {activeTodo ? (
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-lg opacity-90">
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">{activeTodo.description}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Status: <span className="capitalize">{activeTodo.status}</span>
                            </p>
                        </div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
