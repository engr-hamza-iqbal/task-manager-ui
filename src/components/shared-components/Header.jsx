import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Button from "./Button.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  getProfile,
  updateProfile,
} from "../../services/users/user.service.js";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logoutUser } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [profileError, setProfileError] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const profileMenuRef = useRef(null);
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    getProfile()
      .then((data) => setProfile(data.user))
      .catch(() => setProfile({ name: "", email: "" }));
    return undefined;
  }, [isAuthenticated]);

  useEffect(() => {
    if (!showProfileMenu) return undefined;

    const handleOutsideClick = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showProfileMenu]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      setShowLogoutDialog(false);
      navigate("/login");
    }
  };
  const handleProfileSave = async (event) => {
    event.preventDefault();
    setProfileError("");
    setProfileSaving(true);
    try {
      const data = await updateProfile(profile);
      setProfile(data.user);
      setShowProfileModal(false);
    } catch (error) {
      setProfileError(
        error.response?.data?.message || "Unable to update profile.",
      );
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-4 flex h-16 items-center justify-between sm:mx-6 lg:mx-8">
        <Link
          to="/home"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          Task Manager
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-4 text-sm"
        >
          {isAuthenticated ? (
            <>
              <div ref={profileMenuRef} className="relative">
                <Button
                  type="button"
                  fullWidth={false}
                  variant="secondary"
                  onClick={() => setShowProfileMenu((open) => !open)}
                  aria-expanded={showProfileMenu}
                  aria-haspopup="menu"
                >
                  {profile.name || "Profile"} <span aria-hidden="true">⌄</span>
                </Button>
                {showProfileMenu && (
                  <div
                    className="absolute right-0 z-20 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
                    role="menu"
                  >
                    <p className="px-3 py-2 text-xs text-slate-500">
                      {profile.email}
                    </p>
                    <button
                      type="button"
                      className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowProfileModal(true);
                      }}
                      role="menuitem"
                    >
                      Edit profile
                    </button>
                    <button
                      type="button"
                      className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowLogoutDialog(true);
                      }}
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <Modal
                open={showProfileModal}
                title="Edit profile"
                onClose={() => setShowProfileModal(false)}
                closeDisabled={profileSaving}
                labelledBy="profile-modal-title"
              >
                <form
                  onSubmit={handleProfileSave}
                  className="mt-6 flex flex-col gap-4"
                >
                  <ErrorMessage>{profileError}</ErrorMessage>
                  <Input
                    label="Name"
                    name="profile-name"
                    value={profile.name}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Email"
                    name="profile-email"
                    type="email"
                    value={profile.email}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                  <Button type="submit" loading={profileSaving}>
                    Save changes
                  </Button>
                </form>
              </Modal>
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
              <span className="hidden text-slate-500 sm:inline">
                Already have an account?
              </span>
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
