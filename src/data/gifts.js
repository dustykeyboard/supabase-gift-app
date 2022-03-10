import { supabase } from "../supabaseClient";

const getAllGifts = async (list_id) => {
  const { data: gifts } = await supabase
    .from("gifts")
    .select("*")
    .eq('list_id', list_id)
    .order("created_at", { ascending: false });
  return gifts;
};

const createGift = async (list_id, gift) => {
  const { data: newGift } = await supabase
    .from("gifts")
    .insert({ list_id, ...gift })
    .single();
  return newGift;
};

const updateGift = async (id, name) => {
  const { data: updatedGift } = await supabase
    .from("gifts")
    .update({ name })
    .eq("id", id)
    .single();
  return updatedGift;
};

const deleteGift = async (id) => {
  const { data: deletedGift } = await supabase
    .from("gifts")
    .delete()
    .eq("id", id)
    .single();
  return deletedGift;
  
}

export { createGift, getAllGifts, updateGift, deleteGift };
