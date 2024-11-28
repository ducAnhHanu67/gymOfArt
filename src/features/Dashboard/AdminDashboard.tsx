import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Container, List, ListItem, ListItemText, Divider } from '@mui/material';
import Sidebar from '../Dashboard/components/Sidebar';
import Header from '../Dashboard/components/Header';
import StatCard from '../Dashboard/components/StatCard';
import EventList from '../Dashboard/components/EventList';
import StatCardArt from './components/StatCardArt';

interface Order {
    id: number;
    orderCode: string;
    email: string;
    fullName: string;
    address: string;
    amount: number;
    status: string;
    createdAt: string;
}

interface AccountCount {
    user: number;
    artist: number;
}

const AdminDashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [accountCount, setAccountCount] = useState<AccountCount>({ user: 0, artist: 0 });
    const [totalRevenue, setTotalRevenue] = useState<number>(0);

    useEffect(() => {
        // Gọi API để lấy danh sách đơn hàng
        const fetchOrders = async () => {
            try {
                const response = await fetch("https://begymofart.onrender.com/orders");
                const data = await response.json();
                setOrders(data);
                // Tính tổng doanh thu
                const revenue = data.reduce((total: number, order: Order) => total + order.amount, 0);
                setTotalRevenue(revenue);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            }
        };

        // Gọi API để lấy số lượng user và artist
        const fetchAccountCount = async () => {
            try {
                const response = await fetch("https://gymofart.azurewebsites.net/api/Account/count");
                const data = await response.json();
                setAccountCount(data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin số lượng tài khoản:", error);
            }
        };

        fetchOrders();
        fetchAccountCount();
    }, []);

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
                            <StatCard title="Order" number={orders.length} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <StatCard title="Total revenue" number={totalRevenue} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <StatCardArt title="Number User & Artist"
                                user={accountCount.user}
                                artist={accountCount.artist}
                                number={accountCount.artist} />
                        </Grid>
                    </Grid>

                    <EventList />

                    {/* Danh sách đơn hàng */}
                    <Box sx={{ mt: 5 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Danh sách đơn hàng</Typography>
                        <List sx={{ bgcolor: '#2a2a3b', borderRadius: 2 }}>
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={`Order Code: ${order.orderCode}`}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="white">
                                                        {order.fullName} - {order.email}
                                                    </Typography>
                                                    <br />

                                                    <Typography component="span" variant="body2" color="white">
                                                        Amount: ${order.amount}
                                                    </Typography>
                                                    <br />
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color={order.status === 'PENDING' ? 'red' : 'green'}
                                                        sx={{ fontWeight: 'bold' }}
                                                    >
                                                        {order.status}
                                                    </Typography>
                                                    <br />
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider sx={{ bgcolor: '#444' }} />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
