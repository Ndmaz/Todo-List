import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Todo } from "../types/todo"

// Simulate API add
const addTodo = async (newTodo: Omit<Todo, 'id' | 'time'>): Promise<Todo> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // In a real app, this would be a POST request
    // For mock purposes, we create a new todo with generated ID and current time
    const todo: Todo = {
        ...newTodo,
        id: Date.now(), // Simple ID generation
        time: new Date()
    }

    console.log('Adding todo:', todo)
    return todo
}

export const useAddTodoMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addTodo,
        onSuccess: (newTodo) => {
            // Add the new todo to the cache
            queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
                if (!oldTodos) return [newTodo]

                return [...oldTodos, newTodo]
            })
        },
        onError: (error) => {
            console.error('Error adding todo:', error)
        }
    })
} 