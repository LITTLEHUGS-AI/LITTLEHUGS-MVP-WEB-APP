import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
   

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="p-2 md:p-4">

                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
              
            </div>
        </div>

    );
}