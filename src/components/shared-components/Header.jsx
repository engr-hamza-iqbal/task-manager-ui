import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { logout } from "../../services/auth/auth.service.js";

function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [showLogoutDialog, setShowLogoutDialog] = useState(false);
	const isAuthenticated = Boolean(localStorage.getItem("token"));
	const isLoginPage = pathname === "/login";

	const handleLogout = async () => {
		try {
			await logout();
		} finally {
			localStorage.removeItem("token");
			setShowLogoutDialog(false);
			navigate("/login");
		}
	};

	return (
		<header className="border-b border-slate-200 bg-white">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link to="/login" className="text-lg font-bold tracking-tight text-slate-900">
					Task Manager
				</Link>

				<nav aria-label="Main navigation" className="flex items-center gap-4 text-sm">
					{isAuthenticated ? (
						<>
							<Link
								to="/tasks"
								className="font-semibold text-slate-600 transition hover:text-slate-900"
							>
								Tasks
							</Link>
							<Button
								type="button"
								fullWidth={false}
								variant="danger"
								onClick={() => setShowLogoutDialog(true)}
								className="px-0 font-semibold text-blue-600"
							>
								Logout
							</Button>
							<ConfirmDialog
								open={showLogoutDialog}
                                title="Logout?"
                                message="Are you sure you want to logout? You will need to login again to access your tasks."
                                confirmLabel="Logout"
								onCancel={() => setShowLogoutDialog(false)}
                                onConfirm={handleLogout}
                            />
						</>
					) : isLoginPage ? (
						<>
							<span className="hidden text-slate-500 sm:inline">New here?</span>
							<Link
								to="/register"
								className="font-semibold text-blue-600 transition hover:text-blue-700"
							>
								Sign Up
							</Link>
						</>
					) : (
						<>
							<span className="hidden text-slate-500 sm:inline">Already have an account?</span>
							<Link
								to="/login"
								className="font-semibold text-blue-600 transition hover:text-blue-700"
							>
								Login
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}

export default Header;
