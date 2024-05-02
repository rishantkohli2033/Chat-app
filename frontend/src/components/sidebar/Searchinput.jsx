import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';
const Searchinput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("search term must be at least 3 characters long");
      return;
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found");
  }

  const handleSearchClick = () => {
    console.log(isSearchClicked)
    setIsSearchClicked(!isSearchClicked);
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='md:hidden lg:hidden items-center gap-2'>
        <input type="text" placeholder='search' className={`${!isSearchClicked && 'hidden'} w-[75px] input input-bordered rounded-full text-sm`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' onClick={handleSearchClick} className={`${isSearchClicked && 'hidden'}  btn btn-circle ml-2 bg-sky-500 text-white`}>
          <IoSearchSharp />
        </button>
      </form>
      <div className='hidden md:flex lg:flex'>
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
          <input type="text" placeholder='search' className={`input input-bordered rounded-full`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit'className={` btn btn-circle bg-sky-500 text-white`}>
            <IoSearchSharp />
          </button>
        </form>
      </div>
    </>
  )
}

export default Searchinput