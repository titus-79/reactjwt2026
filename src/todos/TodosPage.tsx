import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import type { TodoItem } from './todo-item';
import { createTodo, getTodos } from './todo.service';
import { logoutToken } from '../auth/auth.service';

export function TodosPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      try {
        setTodos(await getTodos());
      } catch (error) {
        console.error('Unable to load todos', error);
      }
    }

    void loadTodos();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    setIsSubmitting(true);

    try {
      const todo = await createTodo(trimmedTitle);
      setTodos((currentTodos) => [...currentTodos, todo]);
      setTitle('');
    } catch (error) {
      console.error('Unable to create todo', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function logout() {
    // TODO: clear the authentication state once JWT authentication is implemented.
    logoutToken()
    navigate('/');
  }

  return (
    <>
      <h2>Todos</h2>

      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
        ) : (
          <li>No todo yet.</li>
        )}
      </ul>

      <h2>Create a new todo item:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title: </span>
          <input
            autoComplete="off"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={!title.trim() || isSubmitting}>
          {isSubmitting ? 'Adding…' : 'Add'}
        </button>
      </form>

      <button type="button" onClick={logout}>
        Déconnexion
      </button>
    </>
  );
}
