import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';
const Searchinput = () => {
  const  [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversation();

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
      toast.error("search term must be at least 3 characters long");
      return;
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
    console.log(conversation);
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }else toast.error("No such user found");
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type="text" placeholder='search' className='input input-bordered rounded-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp />
        </button>
    </form>
  )
}

export default Searchinput