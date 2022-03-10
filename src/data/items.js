import { supabase } from "../supabaseClient";

const getAllItems = async (list_id) => {
  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq('list_id', list_id)
    .order("created_at", { ascending: false });
  return items;
};

const createItem = async (list_id, item) => {
  const { data: newItem } = await supabase
    .from("items")
    .insert({ list_id, ...item })
    .single();
  return newItem;
};

const updateItem = async (id, item) => {
  const { data: updatedItem } = await supabase
    .from("items")
    .update({ ...item, id })
    .eq("id", id)
    .single();
  return updatedItem;
};

const deleteItem = async (id) => {
  const { data: deletedItem } = await supabase
    .from("items")
    .delete()
    .eq("id", id)
    .single();
  return deletedItem;
  
}

export { createItem, getAllItems, updateItem, deleteItem };
