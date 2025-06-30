import { fireEvent, render, screen } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoList from '../TodoList'
import { Status, type Todo } from '../../types/todo'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
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

const mockTodos: Todo[] = [
  { id: 1, description: 'First', status: Status.todo, time: new Date() },
  { id: 2, description: 'Second', status: Status.todo, time: new Date() },
]

describe('TodoList', () => {
  it('renders todos', () => {
    const onTodosChange = jest.fn()
    render(
      <TestWrapper>
        <TodoList todos={mockTodos} onTodosChange={onTodosChange} />
      </TestWrapper>
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })


  it('renders status for each todo', () => {
    const onTodosChange = jest.fn()
    render(
      <TestWrapper>
        <TodoList todos={mockTodos} onTodosChange={onTodosChange} />
      </TestWrapper>
    )
    expect(screen.getAllByText(/Status:/i).length).toBe(2)
  })

  it('should call onTodosChange when a todo is dragged', () => {
    const onTodosChange = jest.fn()
    render(
      <TestWrapper>
        <TodoList todos={mockTodos} onTodosChange={onTodosChange} />
      </TestWrapper>
    )
    const todo1 = screen.getByText('First')
    const todo2 = screen.getByText('Second')
    fireEvent.dragStart(todo1)
    fireEvent.dragOver(todo2)
    fireEvent.drop(todo2)
    expect(onTodosChange).toHaveBeenCalledTimes(1)
  })
 
})