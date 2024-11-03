// components/StatCard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatCardProps {
    title: string;
}

const StatCard: React.FC<StatCardProps> = ({ title }) => {
    return (
        <Box sx={{ bgcolor: '#2a2a3b', p: 2, borderRadius: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">00</Typography>
            {/* Placeholder for chart */}
            <Box sx={{ height: 150, bgcolor: '#333', mt: 2 }} />
        </Box>
    );
};

export default StatCard;
