// src/admin/AdminDashboard.jsx  — PATCHED
// Only change: added "Users" tab (index 0) — all other tabs shift by 1.

import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import ManageUsers      from './ManageUsers';       // ← NEW
import ManageProjects   from './ManageProjects';
import ManageSkills     from './ManageSkills';
import ManageExperience from './ManageExperience';

function TabPanel({ children, value, index }) {
  if (value !== index) return null;
  return <Box sx={{ mt: 3 }}>{children}</Box>;
}

export default function AdminDashboard({ token, onLogout }) {
  const [activeTab,      setActiveTab]      = useState(0);
  const [targetUsername, setTargetUsername] = useState('shubham');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#080B12' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: '#0D1017', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Portfolio Admin
          </Typography>

          {/* Username selector — only relevant for portfolio tabs */}
          {activeTab !== 0 && (
            <TextField
              label="Portfolio Username"
              value={targetUsername}
              onChange={(e) => setTargetUsername(e.target.value)}
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 1, minWidth: 220 }}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Button variant="outlined" color="inherit" onClick={onLogout} size="small">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ borderBottom: '1px solid rgba(255,255,255,0.07)', mt: 1 }}
        >
          <Tab label="Users" />          {/* 0 */}
          <Tab label="Projects" />       {/* 1 */}
          <Tab label="Skills" />         {/* 2 */}
          <Tab label="Experience" />     {/* 3 */}
        </Tabs>

        {/* Users — no username selector needed, loads all users */}
        <TabPanel value={activeTab} index={0}>
          <ManageUsers token={token} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <ManageProjects token={token} username={targetUsername} />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <ManageSkills token={token} username={targetUsername} />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <ManageExperience token={token} username={targetUsername} />
        </TabPanel>
      </Container>
    </Box>
  );
}