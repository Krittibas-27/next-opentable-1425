import React from 'react'

const RestuarentImage = ({images}: {images: string[]}) => {
  return (
    <div className='py-2'>
          <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
            {images.length} photo{images.length > 1 ? "s": ""}
          </h1>
          <div className="flex flex-wrap">
            {
              images.map((urlName: string, index: number)=>(
                <img key={index}
              className="w-56 h-44 mr-1 mb-1"
              src={urlName}
              alt=""
            />
              ))
            } 
           
          </div>
        </div>
  )
}

export default RestuarentImage