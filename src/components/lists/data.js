import { supabase } from "../../supabaseClient";

const getAllLists = async () => {
  const { data: lists } = await supabase
    .from("lists")
    .select("*")
    .order("name", { ascending: true });
  return lists;
};

const getList = async (id) => {
  const { data: lists } = await supabase
    .from("lists")
    .select("*")
    .eq("id", id)
    .single();
  return lists;
};

const createList = async (list) => {
  const { data: newList } = await supabase
    .from("lists")
    .insert(list)
    .single();
  return newList;
};

const updateList = async (id, list) => {
  const { data: updatedList } = await supabase
    .from("lists")
    .update(list)
    .eq("id", id)
    .single();
  return updatedList;
};

const deleteList = async (id) => {
  const { data: deletedList } = await supabase
    .from("lists")
    .delete()
    .eq("id", id)
    .single();
  return deletedList;
  
}

export { createList, getAllLists, getList, updateList, deleteList };
