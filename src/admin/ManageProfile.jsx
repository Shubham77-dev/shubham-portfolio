import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { apiFetch } from './api';

export default function ManageProfile({ username }) {
  const usernameTrimmed = useMemo(() => String(username || '').trim(), [username]);

  const [loading, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    displayName: '',
    bio:         '',
    location:    '',
    tagline:     '',
  });

  // Load existing theme values from the portfolio endpoint
  useEffect(() => {
    if (!usernameTrimmed) return;
    setFetching(true);
    apiFetch(`/portfolio/${encodeURIComponent(usernameTrimmed)}`)
      .then((data) => {
        const theme = data?.portfolio?.theme || {};
        setForm({
          displayName: theme.displayName || '',
          bio:         theme.bio         || '',
          location:    theme.location    || '',
          tagline:     theme.tagline     || '',
        });
      })
      .catch((err) => setError(err?.message || 'Failed to load profile'))
      .finally(() => setFetching(false));
  }, [usernameTrimmed]);

  async function handleSave() {
    if (!usernameTrimmed) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await apiFetch('/portfolio', {
        method: 'PUT',
        body: { username: usernameTrimmed, theme: form },
      });
      setSuccess('Profile saved successfully ✓');
    } catch (err) {
      setError(err?.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  const field = (label, key, multiline = false) => (
    <Grid item xs={12} sm={multiline ? 12 : 6}>
      <TextField
        size="small"
        label={label}
        value={form[key]}
        onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
        fullWidth
        multiline={multiline}
        minRows={multiline ? 3 : undefined}
      />
    </Grid>
  );

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        Profile / Theme
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.6, mb: 2 }}>
        These values are stored in{' '}
        <code>portfolio.theme</code> and displayed in the Hero section.
      </Typography>

      {fetching ? (
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <>
          {error   ? <Alert severity="error"   sx={{ mb: 2 }}>{error}</Alert>   : null}
          {success ? <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert> : null}

          <Grid container spacing={2}>
            {field('Display Name (shown in Hero)', 'displayName')}
            {field('Location',                     'location')}
            {field('Short Tagline',                'tagline')}
            {field('Bio / About summary',          'bio', true)}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            sx={{ minWidth: 140 }}
          >
            {loading ? <CircularProgress size={18} sx={{ mr: 1 }} /> : null}
            {loading ? 'Saving…' : 'Save Profile'}
          </Button>
        </>
      )}
    </Paper>
  );
}