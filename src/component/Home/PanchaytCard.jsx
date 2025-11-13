import React from 'react'
import { PiBuildingOfficeLight } from "react-icons/pi";
import { RiHome2Line } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";


function PanchaytCard({ data, onClick }) {
    return (



        <div onClick={onClick} className='w-full border-0 rounded-2xl shadow-2xl pb-[20px] hover:-translate-y-2 duration-300 ease-in-out'>
            <div className='relative h-[250px] bg-cover'>
                <img className='w-[650px] h-full rounded-t-2xl ' src="aryad.png" alt="" />
                <p className='absolute bottom-[15px] left-[15px] text-white font-extrabold text-[20px] lg:text-[25px] xl:text-[30px]'>{data.Panchayath}</p>
            </div>
            <div className='flex justify-around items-center mt-[20px] 2xl:mt-[30px]  '>
                <div className='flex flex-col items-center'>
                    <p className='text-[20px] lg:text-[25px] bg-[#dbeafe] rounded-[100%] p-2 lg:p-3 2xl:p-4 text-[#4778ec]'><PiBuildingOfficeLight /></p>
                    <p className='font-semibold text-[15px] lg:text-[20px] 2xl:text-[25px]  mt-[5px]'>{data.wardCount}</p>
                    <p className='text-[#817d90]'>Wards</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-[20px] lg:text-[25px] bg-[#dcfce7] rounded-[100%] p-2 lg:p-3 2xl:p-4 text-[#5fb662]'><RiHome2Line /></p>
                    <p className='font-semibold text-[15px] lg:text-[20px] 2xl:text-[25px]  mt-[5px]'>{data.houseCount}</p>
                    <p className='text-[#817d90]'>Houses</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-[20px] lg:text-[25px] bg-[#f3e8ff] rounded-[100%] p-2 lg:p-3 2xl:p-4 text-[#943beb]'><GoPeople /></p>
                    <p className='font-semibold text-[15px] lg:text-[20px] 2xl:text-[25px]  mt-[5px]'>{data.population}</p>
                    <p className='text-[#817d90]'>Population</p>
                </div>

            </div>
            <div className='flex justify-between items-center px-[20px] mt-[15px] 2xl:mt-[30px]'>
                <p className='text-[#817d90]'>Click to manage with</p>
                <p className='text-[#817d90]'><FaArrowRight /></p>
            </div>

        </div>
    

    )
}

export default PanchaytCard