// AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userRoleState } from '../store/userState'; // Đặt đường dẫn phù hợp

interface AdminRouteProps {
    element: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
    const userRole = useRecoilValue(userRoleState);

    if (userRole !== 'admin') {
        return <Navigate to="/" replace />; // Chuyển hướng về trang chủ nếu không phải admin
    }

    return element;
};

export default AdminRoute;
