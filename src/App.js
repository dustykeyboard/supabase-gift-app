import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Account from "./components/Account";
import Lists from "./components/lists/Lists";
import Gifts from "./components/items/Items";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {!session ? (
        <Auth />
      ) : (
        <>
          <Router>
              <nav>
                <ul>
                  <li><Link to="/">🏠</Link></li>
                  <li><Link to="/account">😁</Link></li>
                </ul>
            </nav>
            <main>
              <Routes>
                <Route path="/" element={<Lists />} />
                <Route path="list/:list_id" element={<Gifts />} />
                <Route
                  path="account"
                  element={<Account key={session.user.id} session={session} />}
                />
              </Routes>
            </main>
          </Router>
        </>
      )}
    </>
  );
};

export default App;
