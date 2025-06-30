import { useQuery } from "@tanstack/react-query"
import type { Todo } from "../types/todo"
import todoData from '../mockapi/todo.json'

// Simulate API fetch with delay
const fetchTodos = async (): Promise<Todo[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
        // Validate the data structure
        if (!Array.isArray(todoData)) {
            return []
        }

        // Validate and transform each todo item
        const validTodos = todoData
            .filter((todo: any) => {
                return todo &&
                    typeof todo.id === 'number' &&
                    typeof todo.description === 'string' &&
                    typeof todo.completed === 'boolean' &&
                    typeof todo.status === 'string' &&
                    todo.time
            })
            .map((todo: any) => ({
                ...todo,
                time: new Date(todo.time)
            }))

        return validTodos as Todo[]
    } catch (error) {
        console.error('Error fetching todos:', error)
        return []
    }
}

export const useGetTodosQuery = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2
    })
}