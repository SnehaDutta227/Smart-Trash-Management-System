import React from "react";

import { Link,useNavigate } from "react-router-dom";
import {TbHomePlus} from "react-icons/tb"

const Header = () => {
  const navigate= useNavigate();
  const navHome= () =>{
    navigate('/login');
  }
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex bg-white items-center justify-between">
            <div className="flex w-1/2 py-4 px-5 ">
            <span className="text-lg md:text-2xl font-[Poppins] mx-2 py-4">
                Tomorrow Clean!
            </span>
           <div className="">
           <img src="clean_environment.jpeg" className="h-8 w-2/3 md:h-14 mx-2 py-0 rounded-3xl " />
            </div> 
            </div>

            <div>

            </div>

            <div className="flex w-1/2 space-x-7">
           <div className="flex">
           <Link to={""} className="text-purple-700 hover:text-purple-900 text-xl">Home</Link>
           <p className="mx-2 py-1 text-2xl"><TbHomePlus /></p>
            </div> 
           <Link className="text-purple-500  hover:text-purple-900 text-xl  ">About Us</Link>
           <Link className="text-purple-500  hover:text-purple-900 text-xl  " to={"mymap"}>Monitor</Link>
           

           <Link className="text-purple-500 hover:text-purple-900 text-xl ">Reviews</Link>
           
           <button className="text-lg text-blue-500 py-2 px-8 ml-5 bg-lime-200 hover:bg-lime-500 rounded-l" onClick={navHome}>Log in</button>



        

          
            


            </div>

           
            


        <div>
            
            
        </div>
           
        </div>


    </div>
  )
}

export default Header