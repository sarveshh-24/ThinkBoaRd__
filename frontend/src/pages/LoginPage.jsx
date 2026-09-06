import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { LockKeyholeIcon, MailIcon, NotebookPenIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.trim() || !password) {
            toast.error("Please enter your email and password");
            return;
        }

        setLoading(true);
        try {
            await login({ email, password });
            toast.success("Welcome back!");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to log in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-300 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="flex justify-end mb-4">
                    <button onClick={toggleTheme} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
                        {isDark ? <span className="text-lg">☀️</span> : <span className="text-lg">🌙</span>}
                    </button>
                </div>

                <div className="card bg-base-100 border border-base-content/10 shadow-xl">
                    <div className="card-body p-7 sm:p-8">
                        <div className="text-center mb-5">
                            <div className="mx-auto mb-4 bg-primary/10 rounded-full p-4 w-fit">
                                <NotebookPenIcon className="size-9 text-primary" />
                            </div>
                            <Link to="/" className="text-3xl font-bold text-primary font-serif tracking-tighter">
                                ThinkBoa<span className="breathing-r"> r </span>d
                            </Link>
                            <h2 className="text-2xl font-bold mt-5">Welcome Back</h2>
                            <p className="text-base-content/60 mt-1">Log in to access your notes.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <MailIcon className="size-5 text-base-content/50" />
                                    <input
                                        type="email"
                                        className="grow"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        autoComplete="email"
                                    />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <LockKeyholeIcon className="size-5 text-base-content/50" />
                                    <input
                                        type="password"
                                        className="grow"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        autoComplete="current-password"
                                    />
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-base-content/70 mt-5">
                            Don't have an account?{" "}
                            <Link to="/register" className="link link-primary font-semibold">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
