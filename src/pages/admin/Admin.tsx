import { Outlet } from "react-router-dom"
import Sidebar from "../../component/common/Sidebar"
export default function Admin() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-2">
                <Outlet />
            </main>
        </div>
    )
}
