import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiFetch } from './api';

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : value;
}

function payloadFromForm(form) {
  const payload = {};
  const maybeAdd = (key, value) => {
    if (value === undefined) return;
    if (typeof value === 'string' && value.trim() === '') return;
    payload[key] = value;
  };

  maybeAdd('num', cleanString(form.num));
  maybeAdd('badge', cleanString(form.badge));
  maybeAdd('title', cleanString(form.title));
  maybeAdd('tagline', cleanString(form.tagline));
  maybeAdd('problem', cleanString(form.problem));
  maybeAdd('solution', cleanString(form.solution));

  const techArray = String(form.tech || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (techArray.length > 0) payload.tech = techArray;

  maybeAdd('liveUrl', cleanString(form.liveUrl));
  maybeAdd('githubUrl', cleanString(form.githubUrl));
  maybeAdd('accentColor', cleanString(form.accentColor));
  maybeAdd('status', cleanString(form.status));

  return payload;
}

const initialForm = {
  num: '',
  badge: '',
  title: '',
  tagline: '',
  problem: '',
  solution: '',
  tech: '',
  liveUrl: '',
  githubUrl: '',
  accentColor: '',
  status: '',
};

export default function ManageProjects({ token, username }) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const usernameTrimmed = useMemo(() => String(username || '').trim(), [username]);

  async function loadPortfolio() {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch(`/portfolio/${encodeURIComponent(usernameTrimmed)}`);
      setProjects(data?.portfolio?.projects || []);
    } catch (err) {
      setError(err?.message || 'Failed to load portfolio');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!usernameTrimmed) return;
    loadPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameTrimmed]);

  function startEdit(project) {
    setEditingId(project._id);
    setForm({
      ...initialForm,
      num: project.num || '',
      badge: project.badge || '',
      title: project.title || '',
      tagline: project.tagline || '',
      problem: project.problem || '',
      solution: project.solution || '',
      tech: (project.tech || []).join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      accentColor: project.accentColor || '',
      status: project.status || '',
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!usernameTrimmed) return;

    const projectPayload = payloadFromForm(form);
    if (Object.keys(projectPayload).length === 0) {
      setError('Add at least one project field');
      return;
    }

    try {
      if (editingId) {
        await apiFetch(`/project/${editingId}`, {
          method: 'PUT',
          token,
          body: { project: projectPayload },
        });
      } else {
        await apiFetch('/project', {
          method: 'POST',
          token,
          body: { username: usernameTrimmed, project: projectPayload },
        });
      }

      await loadPortfolio();
      resetForm();
    } catch (err) {
      setError(err?.message || 'Save failed');
    }
  }

  async function handleDelete(id) {
    if (!id) return;
    setError('');
    try {
      await apiFetch(`/project/${id}`, { method: 'DELETE', token });
      await loadPortfolio();
      resetForm();
    } catch (err) {
      setError(err?.message || 'Delete failed');
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            {editingId ? 'Edit Project' : 'Add Project'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {error ? <Alert severity="error">{error}</Alert> : null}

            <TextField
              size="small"
              label="Num"
              value={form.num}
              onChange={(e) => setForm((s) => ({ ...s, num: e.target.value }))}
            />
            <TextField
              size="small"
              label="Badge"
              value={form.badge}
              onChange={(e) => setForm((s) => ({ ...s, badge: e.target.value }))}
            />
            <TextField
              size="small"
              label="Title"
              value={form.title}
              required
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            />
            <TextField
              size="small"
              label="Tagline"
              value={form.tagline}
              onChange={(e) => setForm((s) => ({ ...s, tagline: e.target.value }))}
            />
            <TextField
              size="small"
              label="Status"
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            />
            <TextField
              size="small"
              label="Tech (comma separated)"
              value={form.tech}
              onChange={(e) => setForm((s) => ({ ...s, tech: e.target.value }))}
            />
            <TextField
              size="small"
              label="Live URL"
              value={form.liveUrl}
              onChange={(e) => setForm((s) => ({ ...s, liveUrl: e.target.value }))}
            />
            <TextField
              size="small"
              label="GitHub URL"
              value={form.githubUrl}
              onChange={(e) => setForm((s) => ({ ...s, githubUrl: e.target.value }))}
            />
            <TextField
              size="small"
              label="Accent Color"
              value={form.accentColor}
              onChange={(e) => setForm((s) => ({ ...s, accentColor: e.target.value }))}
            />
            <TextField
              size="small"
              label="Problem"
              value={form.problem}
              multiline
              minRows={3}
              onChange={(e) => setForm((s) => ({ ...s, problem: e.target.value }))}
            />
            <TextField
              size="small"
              label="Solution"
              value={form.solution}
              multiline
              minRows={3}
              onChange={(e) => setForm((s) => ({ ...s, solution: e.target.value }))}
            />

            <Divider />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {editingId ? 'Update' : 'Create'}
              </Button>
              {editingId ? (
                <Button type="button" variant="outlined" onClick={resetForm} disabled={loading}>
                  Cancel
                </Button>
              ) : null}
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={7}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Projects
          </Typography>

          {loading ? (
            <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : projects.length === 0 ? (
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              No projects found for `{usernameTrimmed}`.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {projects.map((p) => (
                <Card key={p._id} variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={{ fontWeight: 800 }}>{p.title || 'Untitled project'}</Typography>
                        {p.badge ? <Typography variant="body2" sx={{ opacity: 0.75 }}>{p.badge}</Typography> : null}
                        {p.status ? (
                          <Typography variant="body2" sx={{ opacity: 0.75 }}>
                            Status: {p.status}
                          </Typography>
                        ) : null}
                        {Array.isArray(p.tech) && p.tech.length > 0 ? (
                          <Typography variant="body2" sx={{ opacity: 0.75 }}>
                            Tech: {p.tech.join(', ')}
                          </Typography>
                        ) : null}
                      </Box>

                      <Box>
                        <IconButton size="small" onClick={() => startEdit(p)} aria-label="Edit">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(p._id)}
                          aria-label="Delete"
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

