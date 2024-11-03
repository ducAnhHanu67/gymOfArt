// AdminDashboard.tsx
import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import Sidebar from '../Dashboard/components/Sidebar';
import Header from '../Dashboard/components/Header';
import StatCard from '../Dashboard/components/StatCard';
import EventList from '../Dashboard/components/EventList';

const AdminDashboard: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', bgcolor: '#1f1f2d', minHeight: '100vh', color: '#fff' }}>
            <Sidebar />
            <Box sx={{ flex: 1, p: 3 }}>
                <Header />
                <Container>
                    <Box sx={{ mt: 3, bgcolor: '#f05454', p: 3, borderRadius: 2 }}>
                        <Typography variant="h5">Hi, Phong Van!</Typography>
                        <Typography>GOA fosters a conducive environment for new painters...</Typography>
                    </Box>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={4}>
                            <StatCard title="Artwork" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <StatCard title="Feedback" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <StatCard title="Artist" />
                        </Grid>
                    </Grid>

                    <EventList />
                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
