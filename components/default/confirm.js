import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react';

const Confirm = ({isHidden, uriBack, title}) => {
  return (
    <div className={`${isHidden && 'hidden'} transform-gpu w-full h-auto bg-gray-100 absolute bottom-0 inset-x-0 flex justify-end px-4 py-3`}>
      <div className="w-full h-12 flex justify-between">

        <div className="w-full h-full flex items-center">
          <Link href={uriBack} className="no-ripple w-full h-auto top-4 absolute bg-red-200">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
              <div className="w-3 h-3 relative overflow-hidden">
                <Image
                  src={`https://res.cloudinary.com/dzfqihfnf/image/upload/v1649224047/Vector_1_bv4a5f.png`}
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  alt="Picture of the author"
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                />
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full h-auto font-semibold flex justify-center items-center mb-2">
          {title}
          </div>
          <div className="w-36 h-0.5 relative overflow-hidden">
            <Image
              src={`https://res.cloudinary.com/dzfqihfnf/image/upload/v1649224061/Ellipse_402_itga1f.png`}
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              alt="Picture of the author"
              layout='fill'
              objectFit='cover'
              placeholder='blur'
            />
          </div>
        </div>

        <div className="w-full h-full" />

      </div>
    </div>
  )
}

export default Confirm
