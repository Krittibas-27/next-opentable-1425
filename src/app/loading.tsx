import React from 'react'
import Header from './components/Header'
import Card from './components/Card'

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {
            [1,2,3,4,5,6,7,8].map((num)=>(
                <div className='animate-pulse bg-slate-200 w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer' key={num}></div>
            ))
        }
      </div>
    </main>
  )
}

export default Loading