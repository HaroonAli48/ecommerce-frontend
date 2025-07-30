import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  // Scroll handler to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/collection", label: "COLLECTION" },
    { to: "/watches", label: "WATCHES" },
    { to: "/jewellery", label: "JEWELLERY" },
    { to: "/makeup", label: "MAKEUP" },
    { to: "/oil", label: "OIL" },
    { to: "/footwear", label: "FOOTWEAR" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 bg-white shadow-md transition-transform duration-300 z-50 h-18 flex items-center`}
        style={{
          transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
          transitionProperty: "transform",
          transitionDuration: "300ms",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        <div className="container mx-auto flex items-center justify-between px-5 md:px-10 font-semibold text-gray-700">
          <Link to="/" className="flex items-center">
            <img
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              src={assets.logo}
              alt="Logo"
              className="w-36"
            />
          </Link>

          <ul className="hidden lg:flex gap-3 text-sm">
            {navLinks.map(({ to, label }) => (
              <NavLink
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                key={label}
                to={to}
                className={({ isActive }) =>
                  `relative px-2 py-1 hover:text-gray-900 transition-colors ${
                    isActive ? "text-gray-900 font-bold" : "text-gray-600"
                  }`
                }
                end
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-1 w-full h-0.5 bg-gray-900 rounded-sm transition-opacity ${
                    window.location.pathname === to
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              </NavLink>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setShowSearch(true);
                navigate("/collection");
              }}
              aria-label="Search"
              className="focus:outline-none"
            >
              <img
                src={assets.search_icon}
                alt="Search"
                className="w-5 h-5 cursor-pointer hover:text-gray-900"
              />
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  if (token) {
                    setProfileMenuOpen((prev) => !prev);
                  } else {
                    navigate("/login");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                aria-label="Profile"
                className="focus:outline-none"
              >
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
              {token && profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 text-gray-700 text-sm z-50">
                  <Link
                    to="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate("/orders");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Orders
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                alt="Cart"
                className="w-6 h-6 cursor-pointer hover:text-gray-900"
              />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden focus:outline-none"
              aria-label="Open Menu"
            >
              <img
                src={assets.menu_icon}
                alt="Menu"
                className="w-6 h-6 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white md:hidden shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close Menu"
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <span>Back</span>
          </button>
          {token && (
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 focus:outline-none font-semibold"
            >
              Logout
            </button>
          )}
        </div>
        <nav className="flex flex-col p-4 gap-4 text-gray-700">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-gray-100 transition ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`
              }
              end
            >
              {label}
            </NavLink>
          ))}
          {!token && (
            <NavLink
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded bg-blue-600 text-white text-center hover:bg-blue-700 transition font-semibold"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
