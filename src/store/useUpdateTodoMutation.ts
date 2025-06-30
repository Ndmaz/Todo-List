import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Todo } from "../types/todo"

// Simulate API update
const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // In a real app, this would be a PUT/PATCH request
    // For mock purposes, we just return the updated todo
    console.log('Updating todo:', updatedTodo)

    return updatedTodo
}

export const useUpdateTodoMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateTodo,
        onSuccess: (updatedTodo) => {
            // Update the cache with the new todo data
            queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
                if (!oldTodos) return [updatedTodo]

                return oldTodos.map(todo =>
                    todo.id === updatedTodo.id ? updatedTodo : todo
                )
            })
        },
        onError: (error) => {
            console.error('Error updating todo:', error)
        }
    })
} 