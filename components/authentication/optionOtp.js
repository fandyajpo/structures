import Link from 'next/link'
import Image from 'next/image'

const OptionOtp = ({uri, logo, option, detail}) => {
  return (
    <Link href={uri} >
      <div className="select-none mb-3 w-full h-auto rounded-lg border p-3 overflow-hidden flex flex-row gap-2">
        <div className="w-20 h-16 bg-gray-100 rounded-md flex justify-center items-center">
          <div className="w-7 h-7 relative overflow-hidden">
            <Image
              src={logo}
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              alt="Picture of the author"
              layout='fill'
              objectFit='cover'
              placeholder='blur'
            />
          </div>
        </div>
        <div className="w-full h-16 flex flex-col">
          <div className="w-full h-16 flex font-bold items-end">
            {option}
          </div>
          <div className="w-full h-16 flex justify-start">
            {detail}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OptionOtp
