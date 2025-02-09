import React, { useContext, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import ProfileDisplay from "./ProfileDisplay";
import { ThreeDots } from "react-loader-spinner";
import Context from "../context";

const Header = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [profileDisplay, setProfileDisplay] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for dropdown menu

  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    setShowLoader(true);
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      setShowLoader(false);
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
      setShowLoader(false);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : `/search`);
  };

  return (
    <div>
      {showLoader ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <ThreeDots color="#7542ff" height={80} width={80} />
        </div>
      ) : (
        <header className="h-16 shadow-md bg-white fixed w-full z-40">
          <div className="h-full container mx-auto flex items-center px-4 justify-between">
            {/* Logo */}
            <Link to="/">
              <Logo w={170} h={60} />
            </Link>

            {/* Search Box */}
            <div className="hidden lg:flex items-center w-full justify-between max-w-sm border-2 rounded-full focus-within:shadow-md pl-3">
              <input
                type="text"
                placeholder="Find your items...."
                className="w-full outline-none"
                onChange={handleSearch}
                value={search}
              />
              <div className="text-lg min-w-[50px] h-8 bg-red-500 flex items-center justify-center rounded-full text-white">
                <IoSearchSharp />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* User Profile Dropdown */}
              {user?._id && (
                <div className="relative">
                  <div
                    className="text-2xl cursor-pointer flex justify-center"
                    onClick={() => setMenuOpen(!menuOpen)} 
                  >
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        className="w-10 h-10 rounded-full"
                        alt={user?.name}
                      />
                    ) : (
                      <FaUserLarge />
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  {menuOpen && (
                    <div
                      className="absolute bg-white top-11 right-0 h-fit p-2 shadow-lg rounded w-48" 
                      onMouseLeave={() => setMenuOpen(false)}
                    >
                      <nav className="flex flex-col ">
                        {user?.role === ROLE.ADMIN && (
                          <NavLink
                            to="/admin-panel/all-products"
                            className={({ isActive }) =>
                              `block p-2 text-center transition-all border-b ${
                                isActive
                                  ? "text-red-500"
                                  : "hover:bg-red-500 hover:text-white "
                              }`
                            }
                          >
                            Admin Panel
                          </NavLink>
                        )}

                        {(user?.role === ROLE.GENERAL ||
                          user?.role === ROLE.ADMIN) && (
                          <NavLink
                            to="/order"
                            className={({ isActive }) =>
                              `block p-2 text-center transition-all border-b ${
                                isActive
                                  ? "text-red-500"
                                  : "hover:bg-red-500 hover:text-white"
                              }`
                            }
                          >
                            Orders
                          </NavLink>
                        )}

                        <button
                          className="block p-2 text-center w-full hover:bg-red-500 hover:text-white transition-all"
                          onClick={() => setProfileDisplay(true)}
                        >
                          Profile
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Display Modal */}
              {profileDisplay && (
                <ProfileDisplay
                  onClose={() => setProfileDisplay(false)}
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  userId={user._id}
                  profilePic={user.profilePic}
                  callFunc={handleLogout}
                />
              )}

              {/* Cart Icon */}
              {user?._id && (
                <Link to="/cart" className="text-2xl relative">
                  <BsCart4 />
                  <div className="bg-red-400 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    <p className="text-sm">{context.cartProductCount}</p>
                  </div>
                </Link>
              )}

              {/* Login / Logout Button */}
              <div>
                {user?._id ? (
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 transition-all"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 transition-all"
                  >
                    LogIn
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
