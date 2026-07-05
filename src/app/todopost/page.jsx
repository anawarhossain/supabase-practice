import TodosData from '@/components/todosData';
import React from 'react';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const todosPage = async () => {

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("todos").select("*");
  console.log(data, error);

  return (
    <div>
      <TodosData data={data}/>
    </div>
  );
};

export default todosPage;