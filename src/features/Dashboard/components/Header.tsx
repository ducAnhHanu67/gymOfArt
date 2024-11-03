// components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton, Tabs, Tab } from '@mui/material';
import { Search, Settings, Notifications } from '@mui/icons-material';

const Header: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#1f1f2d', boxShadow: 'none', borderBottom: '1px solid #333' }}>
            <Toolbar>
                {/* Tiêu đề Dashboard */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 3 }}>
                    Dashboard
                </Typography>

                {/* Tabs Điều hướng */}
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    textColor="inherit"
                    indicatorColor="primary"
                    sx={{
                        '.MuiTab-root': { color: '#566b9b' }, // Màu sắc của chữ trong tab
                        '.Mui-selected': { color: '#fff' } // Màu khi được chọn
                    }}
                >
                    <Tab label="Home" />
                    <Tab label="Artworks" />
                    <Tab label="Feedback" />
                    <Tab label="Reports" />
                </Tabs>

                {/* Tìm kiếm và Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#2a2a3b', borderRadius: 1, pl: 1, pr: 1, mr: 2 }}>
                        <Search sx={{ color: '#566b9b' }} />
                        <InputBase placeholder="Search…" sx={{ color: '#566b9b', ml: 1 }} />
                    </Box>
                    <IconButton color="inherit">
                        <Settings />
                    </IconButton>
                    <IconButton color="inherit">
                        <Notifications />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
