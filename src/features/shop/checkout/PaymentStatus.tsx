// PaymentStatus.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentStatus: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        const status = queryParams.get('status');
        const orderCode = queryParams.get('orderCode');

        if (code === '00' && status === 'PAID') {
            setStatusMessage('Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.');

            // Cập nhật trạng thái đơn hàng trên server
            fetch('https://begymofart.onrender.com/payment-success', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderCode }),
            })
                .then(response => response.json())
                .then(() => console.log(`Trạng thái đơn hàng ${orderCode} đã được cập nhật.`))
                .catch(error => console.error("Lỗi khi cập nhật trạng thái:", error));
        } else {
            setStatusMessage('Thanh toán không thành công hoặc bị hủy.');
        }

        setTimeout(() => navigate('/'), 5000);
    }, [location, navigate]);

    return (
        <div className="payment-status">
            <h1>{statusMessage}</h1>
            <p>Chúng tôi sẽ chuyển bạn về trang chủ trong giây lát...</p>
        </div>
    );
};

export default PaymentStatus;
