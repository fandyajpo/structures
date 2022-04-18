export default function FormRegister({setIsHidden, lang, status, isFetch, errorMsg, onSubmit}) {

  const replaceToNum = (e) => {
    let number = e.target.value
    let formatted = number.replace(/\D/g, '');

    if (formatted.startsWith('0')) {
      formatted = '62' + formatted.substr(1);
    }
    e.target.value=formatted
  }

  return (
    <div className="w-full h-auto pt-2">

      <form onSubmit={onSubmit}>
        <div className="w-full h-auto px-4">
          <div className="w-full h-auto p-4 bg-gray-50 rounded-md border">

            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">{lang.nama[status.lang]}</p>
              <span className="text-xs text-gray-400">{lang.nama.title[status.lang]}</span>
              <input onFocus={() => setIsHidden(true)} onBlur={() => setIsHidden(false)} name="fullname" className="placeholder-gray-300 form-input mt-1 rounded-md border w-full" placeholder={lang.nama.placeholder[status.lang]} />
            </div>

            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">{lang.email[status.lang]}</p>
              <span className="text-xs text-gray-400">{lang.email.title[status.lang]}</span>
              <input onFocus={() => setIsHidden(true)} onBlur={() => setIsHidden(false)} name="email" className="placeholder-gray-300 form-input mt-1 rounded-md border w-full" placeholder={lang.email.placeholder[status.lang]} />
            </div>

            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">{lang.phone[status.lang]}</p>
              <span className="text-xs text-gray-400">{lang.phone.title[status.lang]}</span>
              <input onFocus={() => setIsHidden(true)} onBlur={() => setIsHidden(false)} name="phone" onChange={(e) => replaceToNum(e)} className="placeholder-gray-300 form-input mt-1 rounded-md border w-full" placeholder={lang.phone.placeholder[status.lang]} />
            </div>

            <div className="w-full h-auto flex justify-between items-center gap-5">
              <div className="text-sm font-semibold text-red-400">
                {isFetch && <svg className="animate-spin  mr-3 h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
                {errorMsg && errorMsg.length > 0 && errorMsg}

              </div>
              <button className="w-32 h-auto rounded py-1.5 bg-orange-400 text-sm text-white font-bold">
                Register
              </button>
            </div>

          </div>
        </div>
      </form>

    </div>
  )
}
