import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LockKeyholeIcon, MailIcon, NotebookPenIcon, UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name.trim() || !email.trim() || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await register({ name, email, password });
            toast.success("Account created successfully!");
            navigate("/", { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create account");
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
                            <h2 className="text-2xl font-bold mt-5">Create Your Account</h2>
                            <p className="text-base-content/60 mt-1">Start organizing your thoughts.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Name</span></label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <UserIcon className="size-5 text-base-content/50" />
                                    <input type="text" className="grow" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Email</span></label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <MailIcon className="size-5 text-base-content/50" />
                                    <input type="email" className="grow" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Password</span></label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <LockKeyholeIcon className="size-5 text-base-content/50" />
                                    <input type="password" className="grow" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? "Creating account..." : "Create Account"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-base-content/70 mt-5">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary font-semibold">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
