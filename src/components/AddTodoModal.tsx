import { useState } from "react"
import { Status } from "../types/todo"
import { useAddTodoMutation } from "../store/useAddTodoMutation"

interface AddTodoModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<Status>(Status.todo)
    const addTodoMutation = useAddTodoMutation()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!description.trim()) return

        addTodoMutation.mutate(
            { description: description.trim(), status },
            {
                onSuccess: () => {
                    setDescription("")
                    setStatus(Status.todo)
                    onClose()
                }
            }
        )
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[#00000079] flex items-center justify-center z-50 ">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add New Todo</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Enter todo description..."
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as Status)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={Status.todo}>Todo</option>
                            <option value={Status.in_progress}>In Progress</option>
                            <option value={Status.completed}>Completed</option>
                        </select>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={addTodoMutation.isPending || !description.trim()}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {addTodoMutation.isPending ? "Adding..." : "Add Todo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 