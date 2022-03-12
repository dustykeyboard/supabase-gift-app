import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const Avatar = ({ size, session }) => {
  const [loading, setLoading] = useState(true);
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
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (avatar_url) downloadImage(avatar_url);
  }, [avatar_url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  return (
    <img
      src={
        !loading && avatar_url
          ? avatar_url
          : `https://place-hold.it/${size}x${size}`
      }
      alt={avatar_url ? "Avatar" : "No image"}
      className="avatar image"
      style={{ height: size, width: size }}
      width={size}
      height={size}
    />
  );
};

export default Avatar;
