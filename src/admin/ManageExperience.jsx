import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiFetch } from './api';

function toTagsString(tags) {
  return Array.isArray(tags) ? tags.join(', ') : '';
}

function parseTagsString(s) {
  return String(s || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function ManageExperience({ token, username }) {
  const usernameTrimmed = useMemo(() => String(username || '').trim(), [username]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [experience, setExperience] = useState([]);
  const [error, setError] = useState('');

  async function loadPortfolio() {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = await apiFetch(`/portfolio/${encodeURIComponent(usernameTrimmed)}`);
      setExperience(data?.portfolio?.experience || []);
    } catch (err) {
      setError(err?.message || 'Failed to load experience');
      setExperience([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!usernameTrimmed) return;
    loadPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameTrimmed]);

  function updateAt(index, patch) {
    setExperience((prev) => prev.map((x, i) => (i === index ? { ...x, ...patch } : x)));
  }

  function addExperience() {
    setExperience((prev) => [
      ...prev,
      {
        period: '',
        role: '',
        company: '',
        companyUrl: '',
        location: '',
        type: '',
        description: '',
        tags: [],
        current: false,
        isEducation: false,
      },
    ]);
  }

  function removeExperience(index) {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      await apiFetch('/portfolio', {
        method: 'PUT',
        body: { username: usernameTrimmed, experience },
      });
      setSuccess('Experience saved successfully ✓');
    } catch (err) {
      setError(err?.message || 'Failed to save experience');
      return;
    } finally {
      setSaving(false);
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Experience
          </Typography>

          {loading ? (
            <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          ) : null}
          {success ? <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert> : null}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {experience.map((x, idx) => (
              <Card key={x._id ?? idx} variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontWeight: 800 }}>Entry #{idx + 1}</Typography>
                    <IconButton color="error" onClick={() => removeExperience(idx)} aria-label="Remove entry">
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        size="small"
                        label="Period"
                        value={x.period || ''}
                        onChange={(e) => updateAt(idx, { period: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        size="small"
                        label="Role"
                        value={x.role || ''}
                        onChange={(e) => updateAt(idx, { role: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        size="small"
                        label="Company"
                        value={x.company || ''}
                        onChange={(e) => updateAt(idx, { company: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        size="small"
                        label="Location"
                        value={x.location || ''}
                        onChange={(e) => updateAt(idx, { location: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        size="small"
                        label="Type"
                        value={x.type || ''}
                        onChange={(e) => updateAt(idx, { type: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        size="small"
                        label="Company URL"
                        value={x.companyUrl || ''}
                        onChange={(e) => updateAt(idx, { companyUrl: e.target.value })}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        label="Tags (comma separated)"
                        value={toTagsString(x.tags)}
                        onChange={(e) => updateAt(idx, { tags: parseTagsString(e.target.value) })}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        label="Description"
                        value={x.description || ''}
                        onChange={(e) => updateAt(idx, { description: e.target.value })}
                        fullWidth
                        multiline
                        minRows={3}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={<Checkbox checked={Boolean(x.current)} onChange={(e) => updateAt(idx, { current: e.target.checked })} />}
                        label="Current"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={<Checkbox checked={Boolean(x.isEducation)} onChange={(e) => updateAt(idx, { isEducation: e.target.checked })} />}
                        label="Education"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={addExperience} disabled={saving}>
              Add Entry
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Experience'}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}