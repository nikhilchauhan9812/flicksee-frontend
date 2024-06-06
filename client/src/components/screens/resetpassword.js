import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import {UserContext} from '../../App'

function Resetpassword() {
  const [email, setEmail] = useState("");
  const [loader,setloader] = useState(false)

  const navigate = useNavigate();
  const baseurl ='https://flickseee.onrender.com'
  const postdata = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Please enter valid email", classes: "#c62828 red darken-3" });
      
      return;
    }
    setloader(true  )
    fetch(`${baseurl}/resetpassword`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
       
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       
        if (data.error) {
          M.toast({ html:data.error, classes: "#c62828 red darken-3" });
          setloader(false  )
        } else {
          
          M.toast({ html:data.message, classes: "#43a047 green darken-1" });
          navigate("/login");
          setloader(false )
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
          
          style={{ marginBottom: "70px", fontSize: "40px" }}
        >
          reset password
        </h2>
<div style={{display:'flex',flexDirection:'column'}}>

        <input
          style={{ marginBottom: "30px" }}
          type="text"
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
          />


          </div>
       
        <button
          style={{ marginBottom: "50px",width:'50%', marginTop: "30px" }}
          onClick={() => postdata()}
          
          className="btn waves-effect waves-light #7b1fa2 purple darken-2"
        >{
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
        </div>:"reset password"

          }
        </button>
       
        
      </div>
    </div>
    
  </>
  );
}

export default Resetpassword;
