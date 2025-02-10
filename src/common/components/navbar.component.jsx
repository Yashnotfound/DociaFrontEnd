import { useState, useContext } from "react";
import logo from "../../assets/imgs/logo.png";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../App";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const {userAuth,userAuth:{accessToken,username}} = useContext(UserContext);
  const [ userNavPanel, setUserNavPanel ] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
        setUserNavPanel(false);
    }, 200);
}
const handleUserNavPanel = () => {
    setUserNavPanel(currentVal => !currentVal);
}

  return (
    <>
      <nav className="navbar z-50 backdrop-blur-md px-4 py-3 shadow-md">
        {/* Logo */}
        <Link to="/" className="flex-none h-8">
          <img src={logo} alt="Logo" className="w-full mt-1" />
        </Link>

        {/* Search Box */}
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBoxVisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          {/* Toggle Search Button */}
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() =>
              setSearchBoxVisibility((currentValue) => !currentValue)
            }
          >
            <i className="fi fi-rr-search text-xl"></i>
          </button>

          {/* Write Link */}
          <Link to="/doc-editor" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write Doc</p>
          </Link>

          <Link to="/api-editor" className="hidden md:flex gap-2 link">
          <i className="fi fi-rr-api"></i>
            <p>Make Api doc</p>
          </Link>

          {
            userAuth && accessToken && username ?
            <>
                {/* when user is logged in */}
                 <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                            <button className="w-12 h-12 mt-1">
                            <i className="fi fi-rr-user"></i>
                            </button>
                            {
                                userNavPanel ? <UserNavigationPanel />
                                : ""
                            }
                </div>
            </>
            :
            <>
                {/* Login Button */}
                <Link
                className="btn-dark py-2 px-4 md:py-3 md:px-6"
                to="/login"
                >
                Login
                </Link>

                {/* Sign Up Button */}
                <Link
                className="btn-light py-2 px-4 md:py-3 md:px-6 hidden md:block"
                to="/signup"
                >
                Sign Up
                </Link>
            </>
          }

        </div>
      </nav>
      {/* Content */}
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
