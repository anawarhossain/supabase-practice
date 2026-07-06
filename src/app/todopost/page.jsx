import TodosData from "@/components/todosData";
import React from "react";
import { createClient } from "@/utils/supabase/server";

const todosPage = async () => {
  // ক্লায়েন্ট তৈরি করার সময় await করুন
  const supabase = await createClient();

  // Supabase থেকে ডাটা ফেচিং
  const { data, error } = await supabase.from("todos").select("*");

  if (error) {
    console.error("Error fetching todos:", error);
  }

  return (
    <div>
      {/* ডাটা যদি নাল বা এরর আসে তবে সেটির জন্য একটি খালি অ্যারে ব্যাকআপ রাখুন */}
      <TodosData data={data || []} />
    </div>
  );
};

export default todosPage;
