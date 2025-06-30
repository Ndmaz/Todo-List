import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AddTodoModal } from '../AddTodoModal'

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
})

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createTestQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe('AddTodoModal', () => {
   
    it('renders correctly when isOpen is true', () => {
        const handleClose = jest.fn()
        render(
            <TestWrapper>
                <AddTodoModal isOpen={true} onClose={handleClose} />
            </TestWrapper>
        )
        expect(screen.getByText('Add New Todo')).toBeInTheDocument()
        expect(screen.getByLabelText('Description')).toBeInTheDocument()
        expect(screen.getByLabelText('Status')).toBeInTheDocument()
    })

    it('disables the submit button when description is empty', () => {
        const handleClose = jest.fn()
        render(
            <TestWrapper>
                <AddTodoModal isOpen={true} onClose={handleClose} />
            </TestWrapper>
        )
        expect(screen.getByText('Add Todo')).toBeDisabled()
    })


    it('calls onClose when the close (×) button is clicked', async () => {
        const handleClose = jest.fn()
        render(
            <TestWrapper>
                <AddTodoModal isOpen={true} onClose={handleClose} />
            </TestWrapper>
        )
        const closeButton = screen.getByText('×')
        await userEvent.click(closeButton)
        expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('submits the form and calls onClose on success', async () => {
        const handleClose = jest.fn()
        render(
            <TestWrapper>
                <AddTodoModal isOpen={true} onClose={handleClose} />
            </TestWrapper>
        )

        const descriptionInput = screen.getByLabelText('Description')
        await userEvent.type(descriptionInput, 'A new todo to submit')

        const submitButton = screen.getByText('Add Todo')
        await userEvent.click(submitButton)

        await waitFor(() => {
            expect(handleClose).toHaveBeenCalledTimes(1)
        })
    })

    it('updates the query cache on successful submission', async () => {
        const handleClose = jest.fn()
        const queryClient = createTestQueryClient()
        const initialTodos = [
            { id: 1, description: 'First todo', status: 'todo', time: new Date() },
        ]

        // Pre-populate the cache
        queryClient.setQueryData(['todos'], initialTodos)

        render(
            <QueryClientProvider client={queryClient}>
                <AddTodoModal isOpen={true} onClose={handleClose} />
            </QueryClientProvider>
        )

        const descriptionInput = screen.getByLabelText('Description')
        await userEvent.type(descriptionInput, 'A new todo to be added')

        const submitButton = screen.getByText('Add Todo')
        await userEvent.click(submitButton)

        await waitFor(() => {
            expect(handleClose).toHaveBeenCalledTimes(1)
        })

        // Check the cache
        const updatedTodos = queryClient.getQueryData<any[]>(['todos'])
        expect(updatedTodos).toHaveLength(2)
        expect(updatedTodos?.[1].description).toBe('A new todo to be added')
    })
}) 