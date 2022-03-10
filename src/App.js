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
    <main className="container">
      {!session ? (
        <Auth />
      ) : (
        <>
          <Router>
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/account">Account</Link></li>
                </ul>
            </nav>
            <content>
              <Routes>
                <Route path="/" element={<Lists />} />
                <Route path="list/:list_id" element={<List />} />
                <Route
                  path="account"
                  element={<Account key={session.user.id} session={session} />}
                />
              </Routes>
            </content>
          </Router>
        </>
      )}
    </main>
  );
};

export default App;
