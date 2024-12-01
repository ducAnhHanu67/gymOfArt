import React from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần biểu đồ cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatCardProps {
    title: string;
    success: number;
    pending: number;
}

// Dữ liệu mẫu cho biểu đồ, đảm bảo đúng kiểu dữ liệu
const labels = ['Success', 'Pending'];


const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
                display: false, // Ẩn grid dọc
            },
            ticks: {
                color: '#566b9b', // Màu của chữ
            },
        },
        y: {
            display: false, // Ẩn trục Y
        },
    },
    plugins: {
        legend: {
            display: false, // Ẩn chú thích
        },
        tooltip: {
            enabled: true,
            backgroundColor: '#333', // Màu nền cho tooltip
            titleColor: '#fff',
            bodyColor: '#fff',
        },
    },
};

const StatCardOrder: React.FC<StatCardProps> = ({ title, success, pending }) => {
    const dataValues = [success, pending];
    // Định nghĩa màu sắc cho từng cột
    const backgroundColors = ['#4cf568', '#e74863']; // Màu vàng cho "Artist", màu cam cho "User"

    // Định nghĩa dữ liệu biểu đồ để sử dụng đúng kiểu dữ liệu
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Dataset',
                data: dataValues,
                backgroundColor: backgroundColors, // Áp dụng màu sắc cho từng cột
                borderRadius: 10, // Làm bo góc trên của các thanh
            },
        ],
    };

    return (
        <Box sx={{ bgcolor: '#2a2a3b', p: 3, borderRadius: 2, textAlign: 'center', height: 250 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>{title}</Typography>
            <Box sx={{ height: 150 }}>
                <Bar data={chartData} options={options} />
            </Box>
            <Typography variant="body2" sx={{ color: '#566b9b', mt: 1 }}>Total</Typography>
            <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 'bold' }}>{success + pending}</Typography>
        </Box>
    );
};

export default StatCardOrder;
