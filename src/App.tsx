import { useState } from 'react';
import { TodoProvider } from './context/TodoContext';
import { useTodo } from './hooks/useTodo';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { FilterBar } from './components/filters/FilterBar';
import { TodoList } from './components/todo/TodoList';
import { TodoForm } from './components/todo/TodoForm';
import { TodoModal } from './components/todo/TodoModal';
import type { Todo } from './types';

function AppInner() {
  const { state, dispatch } = useTodo();
  const [modalState, setModalState] = useState<{ open: boolean; editing: Todo | null }>({
    open: false,
    editing: null,
  });

  function openAdd() {
    setModalState({ open: true, editing: null });
  }

  function openEdit(todo: Todo) {
    setModalState({ open: true, editing: todo });
  }

  function closeModal() {
    setModalState({ open: false, editing: null });
  }

  function handleSubmit(data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) {
    if (modalState.editing) {
      dispatch({ type: 'UPDATE_TODO', payload: { id: modalState.editing.id, ...data } });
    } else {
      dispatch({ type: 'ADD_TODO', payload: data });
    }
    closeModal();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header onAddTodo={openAdd} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <FilterBar />
            <TodoList onEdit={openEdit} onAdd={openAdd} />
          </div>
        </main>
      </div>

      {modalState.open && (
        <TodoModal
          title={modalState.editing ? 'タスクを編集' : 'タスクを追加'}
          onClose={closeModal}
        >
          <TodoForm
            initial={modalState.editing ?? undefined}
            categories={state.categories}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </TodoModal>
      )}
    </div>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <AppInner />
    </TodoProvider>
  );
}
