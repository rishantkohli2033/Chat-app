import React from 'react'
import Searchinput from './Searchinput'
import LogoutButton from './LogoutButton'
import Conversations from './Conversations'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <Searchinput/>
        <div className='divider'></div>
        <Conversations/>
        <LogoutButton/>
    </div>
  )
}

export default Sidebar