import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
const Searchinput = () => {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder='search' className='input input-bordered rounded-full' />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp />
        </button>
    </form>
  )
}

export default Searchinput