import "./account.css";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import EditableAvatar from "./EditableAvatar";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="account" aria-live="polite">
      <p className="button block">
        <button type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </p>
      {loading ? (
        <center>Saving ...</center>
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <p>
            <label>
              Email:
              <br />
              {session.user.email}
            </label>
          </p>
          <p>
            <label htmlFor="username">
              Name:
              <br />
              <input
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label htmlFor="website">
              Website:
              <br />
              <input
                id="website"
                type="url"
                value={website || ""}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </p>
          <p>
            <EditableAvatar
              url={avatar_url}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ username, website, avatar_url: url });
              }}
            />
          </p>
          <p>
            <button disabled={loading}>
              Update profile
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Account;
