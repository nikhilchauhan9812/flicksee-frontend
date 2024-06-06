import React,{useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import M from 'materialize-css'


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [username, setuserName] = useState(""); 
  const [loader,setloader]=useState(false)
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseurl ='https://flickseee.onrender.com'
  const sendemail =email.toLowerCase()
  const postdata=()=>{
    if(!sendemail || !password || !username || !name){
      M.toast({html: "Please provide all the fields!",classes:"#c62828 red darken-3"})
      
      return
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(sendemail)){
      M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
      return
    }
    setloader(true)
    fetch(`${baseurl}/signup`,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email:sendemail,
        password,
        username
      })
    }).then(res =>res.json()).then(data=>{
      if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
        setloader(false)
      }else{  
        M.toast({html: data.message,classes:"#43a047 green darken-1"})
      navigate('/login')
      setloader(false)
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2
          className="brand-logo"
          style={{ marginBottom: "70px" }}
        >
        <span>Flicksee</span> 
        </h2>
        <input
          style={{ marginBottom: "30px" }}
          type="text"
          placeholder="name (e.g-John Doe)"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={{ marginBottom: "30px" }}
          type="text"
          placeholder="username (e.g-johndoe001)"
          onChange={(e) => setuserName(e.target.value)}
        />
        <input
          style={{ marginBottom: "30px" }}
          type="text"
          placeholder="email (e.g-john@duo.com)"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ marginBottom: "30px" }}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{  marginTop: "30px" ,width:"20%" }}
          className="btn waves-effect waves-light #7b1fa2 purple darken-2"
        onClick={()=>postdata()}
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
        </div>:"signup"

          }
        </button>
    <p>Already have an account?<Link to='/login' className="link" style={{color:"blue"}}>Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
