import Navbar from "./common/components/navbar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/Auth/userAuthForm.page";
import { createContext, useEffect } from "react";
import { lookInSession } from "./common/utils/session";
import { useState } from "react";
import Editor from "./pages/docs/general/create/doc_creator.page";
import Homepage from "./pages/homepage/homepage.page";
import DocumentView from "./pages/docs/general/displayDocs/documentView.pages";

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

          {/* Homepage */}
          <Route index element={<Homepage />} />

          {/* Signup Page */}
          <Route path="signup" element={<UserAuthForm type="Signup" />} />

          {/* Login Page */}
          <Route path="login" element={<UserAuthForm type="Login" />} />

          {/* Document View Page */}
          <Route path="document/:id" element={<DocumentView/>} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
