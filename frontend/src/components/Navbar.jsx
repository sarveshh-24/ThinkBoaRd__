import { LogOutIcon, PlusIcon, SunIcon, MoonIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isDark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully");
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Error logging out", error);
            toast.error("Failed to log out");
        }
    };

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between gap-3">
                    <Link to="/" className="text-3xl font-bold text-primary font-serif tracking-tighter">
                        ThinkBoa<span className="breathing-r"> r </span>d
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="hidden sm:inline text-sm text-base-content/70">
                            Hi, {user?.name}
                        </span>
                        <button
                            onClick={toggleTheme}
                            className="btn btn-ghost btn-circle"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
                        </button>
                        <Link to="/create" className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span className="hidden sm:inline">New Note</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost btn-circle"
                            aria-label="Log out"
                            title="Log out"
                        >
                            <LogOutIcon className="size-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
