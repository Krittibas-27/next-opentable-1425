"use client"
import React, { useState } from 'react'
import { partySize } from '@/app/data/partySize'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reservation = () => {
    const [selectDate, setSelectDate] = useState<Date | null>(new Date())
    const handelDateChange=(date: Date | null)=>{
        if(!date){
           return setSelectDate(null)
        }
       return setSelectDate(date)
    }
  return (
    <div className="w-[27%] relative text-reg">
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light" id="">
                {
                    partySize.map((item, index)=>{
                        return <option value={item.value} key={index}>{item.lebel}</option>
                    })
                }
            </select>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Date</label>
              <DatePicker selected={selectDate} onChange={handelDateChange} className='w-full p-3'/>
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Time</label>
              <select name="" id="" className="py-3 border-b font-light">
                <option value="">7:30 AM</option>
                <option value="">9:30 AM</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
              Find a Time
            </button>
          </div>
        </div>
      </div>
  )
}

export default Reservation