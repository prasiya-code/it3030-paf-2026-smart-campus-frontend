import { Link, useLocation } from "react-router-dom";

function BookingNavTabs() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: "/", label: "Dashboard", icon: "📊" },
        { path: "/create-booking", label: "Create Booking", icon: "➕" },
        { path: "/my-bookings", label: "My Bookings", icon: "📝" },
        { path: "/manage-bookings", label: "Manage Bookings", icon: "⚙️" }
    ];

    return (
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 w-fit">
            {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                            active
                                ? "bg-white text-blue-700 shadow-sm border border-slate-200"
                                : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-800"
                        }`}
                    >
                        <span className={active ? "scale-110" : ""}>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}

export default BookingNavTabs;
