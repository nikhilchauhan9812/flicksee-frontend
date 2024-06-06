import React, { useContext } from "react";
import { UserContext } from "../App";
import { Link, useNavigate ,useLocation} from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation()
  const { state, dispatch } = useContext(UserContext);
  
  const renderlist = () => {
    if (state) {
      return [
       
        <li key='1'>
          <Link to="/profile" >
            My Profile
          </Link>
        </li>,
        <li key='2'>
          <button
            className="btn waves-effect waves-light #7b1fa2 purple darken-2"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/login");
            }}
            style={{marginRight:'10px'}}
          >
            signout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key='3'>
          <Link to="/login" style={{
borderBottom: location.pathname==="/login" ?'2px solid black':null

          }}>Login</Link>
        </li>,
        <li key='4'>
          <Link to="/signup"
          style={{
            borderBottom: location.pathname==="/signup" ?'2px solid black':null
            
                      }}>Signup</Link>
        </li>,
      ];
    }
  };
  return (
    // add_to_queue
    <nav>
      <div class="nav-wrapper white">
       {location.pathname!=='/signup' && location.pathname!=="/login" ?<Link to={state?"/":"/login"} class="brand-logo  left">
          Flicksee
        </Link>
        :null
}
        <ul id="nav-mobile" className="right ">
          {renderlist()}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
