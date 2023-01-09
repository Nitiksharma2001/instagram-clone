import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/myprofile">My Profile</Link>
        </li>,
        <li>
          <Link to="/createpost">Create Post</Link>
        </li>,
        <li>
          <Link to="/myfollowingsposts">My Followings Posts</Link>
        </li>,
        <button
          onClick={() => {
            localStorage.clear();
            dispatch({type:"CLEAR"})
            navigate("/login");
          }}
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          logout
        </button>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
