import { useMutation, useQueryClient } from "@tanstack/react-query"

// Simulate API delete
const deleteTodo = async (todoId: number): Promise<void> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // In a real app, this would be a DELETE request
    // For mock purposes, we just log the deletion
    console.log('Deleting todo with ID:', todoId)
}

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: (_, deletedTodoId) => {
            // Remove the deleted todo from the cache
            queryClient.setQueryData<Array<{ id: number }>>(["todos"], (oldTodos) => {
                if (!oldTodos) return []

                return oldTodos.filter(todo => todo.id !== deletedTodoId)
            })
        },
        onError: (error) => {
            console.error('Error deleting todo:', error)
        }
    })
} 