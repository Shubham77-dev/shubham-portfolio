import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { apiFetch } from './api';
import { isAdminToken, setAdminToken } from './token';

export default function AdminLogin({ onLogin, onLogout }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      if (!data?.token) {
        throw new Error('No token returned');
      }

      if (!isAdminToken(data.token)) {
        throw new Error('Access denied: admin role required');
      }

      // Store token for subsequent authenticated requests.
      setAdminToken(data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err?.message || 'Login failed');
      onLogout?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Admin Panel
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
          Login to manage portfolio data
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <Button type="submit" variant="contained" disabled={loading} size="large">
          {loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
          Login
        </Button>
      </Box>
    </Container>
  );
}

