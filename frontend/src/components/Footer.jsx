// import React from 'react'
// import {Link} from 'react-router-dom'
import logo from '../assets/images/logo1.png'
// import {RiLinkedFill} from 'react-icons/ri'
// import {AiFillYoutube,AiFillGithub,AiOutlineInstagram} from 'react-icons/ai'


const Footer = () => {
  const year = new Date().getFullYear()
  return <footer >
    <div className='container'>
      <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
        <div>
          <img src={logo} alt="" />
          <p className='text-[16px] leading-7 font-[400] text-Color mt-4'>Copyright @ {year}</p>
        </div>
        
      </div>
    </div>
    </footer>
};

export default Footer;