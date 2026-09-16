import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth/auth.service.js";

function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const isAuthenticated = Boolean(localStorage.getItem("token"));
	const isLoginPage = pathname === "/login";

	const handleLogout = async () => {
		try {
			await logout();
		} finally {
			localStorage.removeItem("token");
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
							<button
								type="button"
								onClick={handleLogout}
								className="font-semibold cursor-pointer text-blue-600 transition hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
							>
								Logout
							</button>
                           
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
