import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from './features/auth/authState';
// Atom lưu trạng thái đăng nhập

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = useRecoilValue(authState).isAuthenticated;

    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, chuyển hướng đến login
        return <Navigate to="/auth/login" />;
    }

    // Nếu đã đăng nhập, hiển thị nội dung route
    return children;
}
