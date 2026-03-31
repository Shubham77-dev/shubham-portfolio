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
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { apiFetch } from './api';

export default function ManageSkills({ token, username }) {
  const usernameTrimmed = useMemo(() => String(username || '').trim(), [username]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  async function loadPortfolio() {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch(`/portfolio/${encodeURIComponent(usernameTrimmed)}`);
      setSkills(data?.portfolio?.skills || []);
    } catch (err) {
      setError(err?.message || 'Failed to load skills');
      setSkills([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!usernameTrimmed) return;
    loadPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameTrimmed]);

  function updateSkill(index, patch) {
    setSkills((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function addSkill() {
    setSkills((prev) => [...prev, { name: '', expert: false }]);
  }

  function removeSkill(index) {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      await apiFetch('/portfolio', {
        method: 'PUT',
        token,
        body: { username: usernameTrimmed, skills },
      });
    } catch (err) {
      setError(err?.message || 'Failed to save skills');
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
            Skills
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

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {skills.map((s, idx) => (
              <Card key={s._id ?? idx} variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <TextField
                    size="small"
                    label="Skill Name"
                    value={s.name || ''}
                    onChange={(e) => updateSkill(idx, { name: e.target.value })}
                    sx={{ minWidth: 260 }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(s.expert)} onChange={(e) => updateSkill(idx, { expert: e.target.checked })} />}
                    label="Expert"
                  />

                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton color="error" onClick={() => removeSkill(idx)} aria-label="Remove skill">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={addSkill} disabled={saving}>
              Add Skill
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={saving || skills.length === 0}>
              {saving ? 'Saving...' : 'Save Skills'}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

