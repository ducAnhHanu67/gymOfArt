// components/EventList.tsx
import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';

const EventList: React.FC = () => {
    const events = [
        { topic: 'Illustration Challenge #14', description: 'Mỗi năm vào lễ lớn...' },
        { topic: 'Character design', description: 'Với mong muốn là nơi ghi lại...' },
        { topic: 'Web UX/UI design', description: 'File gốc của tác phẩm phải có độ phân giải...' },
    ];

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Latest</Typography>
            {events.map((event, index) => (
                <Card sx={{ bgcolor: '#333', color: 'white', my: 1 }} key={index}>
                    <CardContent>
                        <Chip label="EVENT" color="primary" size="small" sx={{ mb: 1 }} />
                        <Typography variant="h6">{event.topic}</Typography>
                        <Typography variant="body2">{event.description}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default EventList;
