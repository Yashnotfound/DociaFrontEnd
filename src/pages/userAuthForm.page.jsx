import { useRef,useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import { Link, Navigate } from "react-router-dom";
import {toast,Toaster} from 'react-hot-toast';
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";


const UserAuthForm = ({ type }) => {
  const authForm = useRef(null);
  const isLogin = type.toLowerCase() === "login";

  
  let {userAuth,setUserAuth} = useContext(UserContext);

  const userAuthThroughServer = async (serverRoute, formData) => {

    await axios.post( "http://localhost:8080/api/auth" + serverRoute, formData)
    .then(res => {
      storeInSession("user",JSON.stringify(res.data));
      setUserAuth(res.data);
    })
    .catch(err => {
      toast.error(err.response.data.message);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

        let serverRoute = isLogin ? "/login" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/; // regex for password

        //formData
        let form = new FormData(formElement)
        let formData = {};

        for(let [key, value] of form.entries()){
            formData[key] = value;
        }

        let { username, email, password } = formData;
        
        //form validation
            if(username){
                if (username.length < 3) {
                    return toast.error("Fullname must be at least 3 letters long");
                }
            }
          if (!email.length) {
            return toast.error("Enter Email");
          }
          if (!emailRegex.test(email)) {
            return toast.error("Email is Invalid");
          }
          if (!passwordRegex.test(password)) {
            return toast.error("password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters");
          }
          userAuthThroughServer(serverRoute, formData);
  };

  return (
    userAuth && userAuth.accessToken?
   <Navigate to={"/"} />
   
    :

    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster/>
        <form
          id="formElement" 
          ref={authForm} 
          onSubmit={handleSubmit}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {isLogin ? "Welcome Back" : "Join Today"}
          </h1>

          {!isLogin && (
            <InputBox
              key="username"
              name="username"
              type="text"
              placeholder="User Name"
              icon="fi-rr-user"
            />
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />

          <button 
            className="btn-dark center mt-14" 
            type="submit"
          >
            {isLogin ? "Continue" : "Create Account"}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          {isLogin ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-black">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already have an account?{" "}
              <Link to="/login" className="underline text-black">
                Log in
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
