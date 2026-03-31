import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { clearAdminToken, getAdminToken, isAdminToken } from './token';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#080B12' },
  },
});

export default function AdminApp() {
  const [token, setToken] = useState(() => getAdminToken());
  const loggedIn = Boolean(token && isAdminToken(token));

  useEffect(() => {
    // Keep state aligned with localStorage (e.g., across tabs).
    const onStorage = () => setToken(getAdminToken());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loggedIn ? (
        <AdminDashboard
          token={token}
          onLogout={() => {
            clearAdminToken();
            setToken(null);
          }}
        />
      ) : (
        <AdminLogin
          onLogin={(nextToken) => {
            setToken(nextToken);
          }}
          onLogout={() => {
            clearAdminToken();
            setToken(null);
          }}
        />
      )}
    </ThemeProvider>
  );
}

