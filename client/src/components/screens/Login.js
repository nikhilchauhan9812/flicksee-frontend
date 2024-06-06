import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import {UserContext} from '../../App'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {state,dispatch}=useContext(UserContext)
  const [loader,setloader] = useState(false)
const sendemail = email.toLowerCase()
  const navigate = useNavigate();
 const baseurl ='https://flickseee.onrender.com'
  const postdata = () => {

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(sendemail)||!password) {
      M.toast({ html: "Please enter valid email and password", classes: "#c62828 red darken-3" });
      
      return;
    }
    setloader(true)
    fetch(`${baseurl}/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:sendemail,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.token);
        if (data.error) {
          M.toast({ html:data.error, classes: "#c62828 red darken-3" });
          setloader(false)
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          M.toast({ html:"successfully Signed in", classes: "#43a047 green darken-1" });
          navigate("/");
          setloader(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    <div  className="mycard">
      <div className="card auth-card input-field">
        <h2
          className="brand-logo"
          style={{ marginBottom: "70px", fontSize: "55px" }}
        >
          Flicksee
        </h2>

        <input
          style={{ marginBottom: "30px" }}
          type="text"
          placeholder="email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <div style={{display:'flex',flexDirection:'column'}}>

        <input
          style={{ marginBottom: "30px" }}
          type="password"
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}
          />
     <Link to='/resetpassword' style={{color:'blue'}}>  <text style={{float:'left',color:'blue'}}> forgot your password?</text></Link>
          </div>
        <button
          style={{ marginBottom: "20px", marginTop: "30px",width:"20%" }}
          onClick={() => postdata()}
          
          className="btn waves-effect waves-light #7b1fa2 purple darken-2"
        >
          {
              loader ?  
              <div class="preloader-wrapper small active custom-spinner">

              <div class="spinner-layer spinner-black-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>:"login"

              }
        </button>
        <p>
          New to <span style={{fontSize:'30px'}}>Flicksee</span>?
          <Link to="/signup" className="link">
            SignUp
          </Link>
        </p>
        
      </div>
    </div>
    
  </>
  );
}

export default Login;
