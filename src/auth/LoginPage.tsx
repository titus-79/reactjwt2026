import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { login } from './auth.service';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('bastien@example.com');
  const [password, setPassword] = useState('tacostacos');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ username, password });
      navigate('/todos');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status && [401, 403].includes(err.response.status)) {
        setError('Identifiants incorrects.');
      } else {
        setError('Connexion impossible, réessaie plus tard.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email: </span>
          <input
            type="email"
            autoComplete="username"
            placeholder="email@example.com"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label>
          <span>Password: </span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="**********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send'}
        </button>
      </form>
    </>
  );
}