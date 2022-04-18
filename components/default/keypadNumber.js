import Image from 'next/image';


export default function KeypadNumber({withConfirm, isFetch, isTyping, isDel, isDone}) {

  return (
    <div className={`select-none w-full h-52 ${withConfirm && 'mb-16'} absolute bottom-0 inset-x-0 flex justify-end p-4`}>
      <div className="w-full h-full relative flex flex-row gap-1">

        <div className="w-full h-full flex flex-col gap-1">

            <button disabled={isFetch} onClick={() => isTyping("1")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            1
            </button>

            <button disabled={isFetch} onClick={() => isTyping("4")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            4
            </button>

            <button disabled={isFetch} onClick={() => isTyping("7")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            7
            </button>

            <div className="w-full h-full border rounded-md" />

        </div>

        <div className="w-full h-full flex flex-col gap-1">

            <button disabled={isFetch} onClick={() => isTyping("2")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            2
            </button>

            <button disabled={isFetch} onClick={() => isTyping("5")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            5
            </button>

            <button disabled={isFetch} onClick={() => isTyping("8")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            8
            </button>

            <button disabled={isFetch} onClick={() => isTyping("0")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            0
            </button>

        </div>

        <div className="w-full h-full flex flex-col gap-1">

            <button disabled={isFetch} onClick={() => isTyping("3")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            3
            </button>

            <button disabled={isFetch} onClick={() => isTyping("6")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            6
            </button>

            <button disabled={isFetch} onClick={() => isTyping("9")} className="select-none w-full h-full bg-gray-50 border rounded-md flex text-lg font-bold justify-center items-center">
            9
            </button>

            <div className="w-full h-full border rounded-md" />

        </div>

        <div className="w-full h-full flex flex-col gap-1">
          <button disabled={isFetch} onClick={() => isDel()} className="w-full h-full bg-gray-50 border rounded-md flex justify-center items-center">
            <div className="select-none w-4 h-4 relative">
              <Image src="/static/images/backspace.png" alt="am2" layout="fill" priority={true}/>
            </div>
          </button>
          <button disabled={isFetch} onClick={() => isDone()} className="w-full h-full bg-orange-400 text-white border rounded-md flex text-sm justify-center items-center">
          Done
          </button>
        </div>
      </div>
    </div>
  )

}
