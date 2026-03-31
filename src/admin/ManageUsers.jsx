// src/admin/ManageUsers.jsx  — NEW FILE
//
// Admin panel tab: list all users, create new ones, edit role/password, delete.

import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon   from '@mui/icons-material/Delete';
import EditIcon     from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RefreshIcon  from '@mui/icons-material/Refresh';
import { apiFetch } from './api';

// ─── Helpers ─────────────────────────────────────────────────────

function RoleBadge({ role }) {
  return (
    <Chip
      label={role}
      size="small"
      color={role === 'admin' ? 'secondary' : 'default'}
      sx={{ fontWeight: 700, fontSize: 11 }}
    />
  );
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

// ─── Create / Edit dialog ────────────────────────────────────────

const emptyForm = {
  username: '',
  email:    '',
  password: '',
  role:     'user',
};

function UserDialog({ open, editUser, onClose, onSaved }) {
  const isEdit = Boolean(editUser);
  const [form,    setForm]    = useState(emptyForm);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');

  // Populate form when editing an existing user.
  useEffect(() => {
    if (open) {
      setError('');
      setForm(
        isEdit
          ? { username: editUser.username, email: editUser.email, password: '', role: editUser.role }
          : emptyForm
      );
    }
  }, [open, editUser, isEdit]);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isEdit) {
        // Only send password when the admin typed something.
        const body = { username: form.username, email: form.email, role: form.role };
        if (form.password) body.password = form.password;
        await apiFetch(`/users/${editUser._id}`, { method: 'PUT', body });
      } else {
        await apiFetch('/users', {
          method: 'POST',
          body: { username: form.username, email: form.email, password: form.password, role: form.role },
        });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>
        {isEdit ? `Edit — ${editUser?.username}` : 'Create New User'}
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          {error ? <Alert severity="error">{error}</Alert> : null}

          <TextField
            label="Username"
            value={form.username}
            onChange={set('username')}
            required
            size="small"
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={set('email')}
            required
            size="small"
            fullWidth
          />
          <TextField
            label={isEdit ? 'New Password (leave blank to keep current)' : 'Password'}
            type="password"
            value={form.password}
            onChange={set('password')}
            required={!isEdit}
            size="small"
            fullWidth
            inputProps={{ minLength: isEdit ? 0 : 6 }}
          />
          <FormControl size="small" fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={form.role} label="Role" onChange={set('role')}>
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? <CircularProgress size={18} sx={{ mr: 1 }} /> : null}
            {isEdit ? 'Save Changes' : 'Create User'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

// ─── Delete confirmation dialog ───────────────────────────────────

function DeleteDialog({ open, user, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error,    setError]    = useState('');

  async function handleDelete() {
    setDeleting(true);
    setError('');
    try {
      await apiFetch(`/users/${user._id}`, { method: 'DELETE' });
      onDeleted();
      onClose();
    } catch (err) {
      setError(err?.message || 'Delete failed');
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>Delete user?</DialogTitle>
      <DialogContent>
        {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
        <Typography>
          This will permanently delete{' '}
          <strong>{user?.username}</strong> and their entire portfolio data.
          This cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={deleting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? <CircularProgress size={18} sx={{ mr: 1 }} /> : null}
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main component ───────────────────────────────────────────────

export default function ManageUsers() {
  const [users,      setUsers]      = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [search,     setSearch]     = useState('');

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser,   setEditUser]   = useState(null);   // null = create mode
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function loadUsers() {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/users');
      setUsers(data?.users || []);
    } catch (err) {
      setError(err?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadUsers(); }, []);

  // Client-side search filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, search]);

  function openCreate() {
    setEditUser(null);
    setDialogOpen(true);
  }

  function openEdit(user) {
    setEditUser(user);
    setDialogOpen(true);
  }

  return (
    <Box>
      {/* ── Toolbar ── */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, flexGrow: 1 }}>
          Users ({users.length})
        </Typography>

        <TextField
          placeholder="Search username / email / role…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 260 }}
        />

        <Tooltip title="Refresh">
          <span>
            <IconButton onClick={loadUsers} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={openCreate}
        >
          Add User
        </Button>
      </Box>

      {/* ── Error banner ── */}
      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      {/* ── Loading ── */}
      {loading ? (
        <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <Typography sx={{ opacity: 0.5 }}>
            {search ? 'No users match your search.' : 'No users found.'}
          </Typography>
        </Paper>
      ) : (
        /* ── User cards ── */
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {filtered.map((u) => (
            <Card
              key={u._id}
              variant="outlined"
              sx={{ bgcolor: 'rgba(255,255,255,0.02)', transition: 'border-color .15s', '&:hover': { borderColor: 'rgba(255,255,255,0.2)' } }}
            >
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Grid container spacing={1} alignItems="center">

                  {/* Avatar circle */}
                  <Grid item>
                    <Box sx={{
                      width: 40, height: 40, borderRadius: '50%',
                      bgcolor: u.role === 'admin' ? 'secondary.dark' : 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 16, color: 'white',
                      flexShrink: 0,
                    }}>
                      {u.username[0].toUpperCase()}
                    </Box>
                  </Grid>

                  {/* Name + email */}
                  <Grid item xs>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
                        {u.username}
                      </Typography>
                      <RoleBadge role={u.role} />
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.6, fontSize: 13 }}>
                      {u.email}
                    </Typography>
                  </Grid>

                  {/* Joined date */}
                  <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography variant="caption" sx={{ opacity: 0.4 }}>
                      Joined {formatDate(u.createdAt)}
                    </Typography>
                  </Grid>

                  {/* Actions */}
                  <Grid item>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => openEdit(u)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        sx={{ color: 'error.main' }}
                        onClick={() => setDeleteTarget(u)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* ── Dialogs ── */}
      <UserDialog
        open={dialogOpen}
        editUser={editUser}
        onClose={() => setDialogOpen(false)}
        onSaved={loadUsers}
      />
      <DeleteDialog
        open={Boolean(deleteTarget)}
        user={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDeleted={loadUsers}
      />
    </Box>
  );
}