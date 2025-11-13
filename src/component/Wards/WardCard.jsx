import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";




function WardCard({ data, onCardClick }) {
    return (
        <div className='' onClick={onCardClick}>
            <div className='shadow-2xl border-0 rounded-2xl py-[25px] px-[25px] hover:-translate-y-2 duration-300 ease-in-out'>
                <div className='flex justify-between items-center'>
                    <div>
                        <p className='bg-[#e0e7ff] p-3 text-[20px] text-[#4f51e8] rounded-[100%] '><CiLocationOn /></p>
                    </div>
                    <div>
                        <p className='bg-[#dcfce7]  rounded-[20px] px-3 py-2 text-center text-[#1a6837]' >Active</p>
                    </div>
                </div>
                <p className='text-[20px] font-bold mt-[15px]'>Ward {data.WardNo} - {data.Panchayath}</p>
                <div className='flex justify-between mt-[15px]'>
                    <p>House:</p>
                    <p className='font-semibold'>{data.houseCount}</p>
                </div>
                <div className='flex justify-between  mt-[10px]'>
                    <p>Population:</p>
                    <p className='font-semibold'>{data.population}</p>
                </div>
                <div className='flex justify-between mt-[10px]'>
                    <p>Male:</p>
                    <p className='font-semibold'>{data.maleCount}</p>
                </div>
                <div className='flex justify-between mt-[10px]'>
                    <p>Female:</p>
                    <p className='font-semibold'>{data.femaleCount}</p>
                </div>
                <div className='flex justify-between items-center mt-[30px]'>
                    <p className='text-[#817d90]'>View houses</p>
                    <p className='text-[#817d90]'><FaArrowRight /></p>
                </div>


            </div>
        </div>



    )
}

export default WardCard