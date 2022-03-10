import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Account from "./components/Account";
import Lists from "./components/Lists";
import List from "./components/List";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <>
          <Router>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/account">Account</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Lists />} />
              <Route path="list/:list_id" element={<List />} />
              <Route
                path="account"
                element={<Account key={session.user.id} session={session} />}
              />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
};

export default App;
