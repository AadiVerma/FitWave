import { Outlet } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
function AdminLayout() {
    return (
        <div className="bg-black min-h-screen overflow-hidden flex">
            <AdminSideBar />
            <div className="w-full flex flex-col">
                <main className="flex-grow overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}


export default AdminLayout;

