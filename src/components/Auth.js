import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="authHeader">
        <h1>
          <img src="/icons/list.png" width="32" height="32" alt="logo" /> Gift
          Lists
        </h1>
      </div>
      {loading ? (
        <center>Sending magic link to your email...</center>
      ) : (
        <form onSubmit={handleLogin}>
          <p className="description">
            Sign in with your email below, then check your email for a link.
          </p>
          <p>
            <label htmlFor="email">
              Email:
              <br />
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </p>
          <p>
            <button aria-live="polite">Send me a link</button>
          </p>
        </form>
      )}
    </>
  );
}
