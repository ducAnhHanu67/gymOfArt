// components/Sidebar.tsx
import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Typography, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Sidebar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ width: 250, bgcolor: '#2a2a3b', p: 2, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
            {/* Logo và Tên */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <svg className="w-12 h-12 mr-2" viewBox="0 0 48 48" width="36" height="36">
                    <polygon points="24,4 36,12 36,36 24,44 12,36 12,12" fill="#37B6BD" />
                    <rect x="18" y="16" width="12" height="4" fill="#FFF3E0" />
                    <rect x="18" y="24" width="12" height="4" fill="#FFF3E0" />
                    <rect x="18" y="32" width="12" height="4" fill="#FFF3E0" />
                </svg>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#E73C3C' }}>GoA</Typography>
                    <Typography variant="body2" sx={{ color: '#37B6BD' }}>GYM OF ART</Typography>
                </Box>
            </Box>

            {/* Danh sách Menu */}
            <Box sx={{ flex: 1 }}>
                <List>
                    {['Overview', 'Filters', 'User Statistics', 'Custom Reports'].map((text) => (
                        <ListItemButton key={text}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>

            {/* Thông tin người dùng */}
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar alt="User Avatar" src="/path/to/avatar.jpg" /> {/* Thay đường dẫn ảnh */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">TVPVAn</Typography>
                    <Typography variant="body2" color="#566b9b">@van203</Typography>
                </Box>
                <IconButton onClick={handleClick} sx={{ color: 'white' }}>
                    <ExpandMore />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            backgroundColor: '#2a2a3b', color: 'white', minWidth: 150,
                        },
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={() => { handleClose(); /* Gọi hàm logout tại đây */ }}>Logout</MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default Sidebar;
