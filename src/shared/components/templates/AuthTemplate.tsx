import { Outlet } from 'react-router-dom';

export default function AuthTemplate() {
  return (
    <div className="bg-gray-800 flex flex-col items-center justify-center h-screen">
      <Outlet />
    </div>
  );
}
