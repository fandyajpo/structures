import Image from 'next/image'

export default function LogoAtas() {

  return (
      <div className="w-full h-auto relative bg-transparent">
          <div className="w-40 h-40 relative z-0">
              <Image src="/static/images/1.png" alt="am1" layout="fill" priority={true}/>
              <div className="w-full h-40 flex items-center">
                  <div className="w-full h-auto relative transparent z-1 pl-5">
                      <div className="w-40 h-14 relative">
                          <Image src="/static/images/2.png" alt="am2" layout="fill" priority={true}/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )

}
