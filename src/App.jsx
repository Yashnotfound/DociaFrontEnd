import Navbar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect } from "react";
import { lookInSession } from "./common/session";
import { useState } from "react";
import Editor from "./pages/editor.page";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = lookInSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ accessToken: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        
        {/* Doc-editor path */}
        <Route path="doc-editor" element={<Editor />} />

        {/* Parent Route with Navbar */}
        <Route path="/" element={<Navbar />}>

          {/* Signup Page */}
          <Route path="signup" element={<UserAuthForm type="Sign-up" />} />

          {/* Login Page */}
          <Route path="login" element={<UserAuthForm type="Login" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
