import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Nav from "./components/Nav";
import Lists from "./components/lists";
import Items from "./components/items";
import Account from "./components/Account";

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
            <Nav />
            <main>
              <Routes>
                <Route path="/" element={<Lists />} />
                <Route path="list/:list_id" element={<Items />} />
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
