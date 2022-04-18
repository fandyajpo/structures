import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from "next/router";

import LogoAtas from "components/default/logoAtas";
import KeypadNumber from "components/default/keypadNumber";
import Confirm from "components/default/confirm";

import fetchJson, { FetchError } from "lib/fetchJson";

import { useContext, useState, useEffect } from "react";
import * as Lang from "lib/lang";
import { LangContext } from "context/lang";

export default function Login(props) {
  const router = useRouter();
  const { status } = useContext(LangContext);

  const [phone, setPhone] = useState("");
  const [isFetch, setIsFetch] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    router.prefetch(`/authentication/otp/[...slug]`);
  }, []);
  return (
    <div className='w-full h-screen relative select-none'>
      <div className='w-full h-full bg-white relative'>
        <LogoAtas />

        <div className='w-full h-2/4 relative'>
          <div className='w-full h-full absolute z-1 flex justify-end'>
            <div className='w-1/4 h-full relative'>
              <div className='w-full h-auto'>
                <Image
                  src='/static/images/4.png'
                  alt='am2'
                  layout='fill'
                  priority={true}
                />
              </div>
            </div>
          </div>
          <div className='w-full h-full absolute z-0 bg-transparent pr-4 pl-3 pt-11 '>
            <div className='w-full h-36 shadow relative rounded-lg backdrop-blur-sm bg-white/30 border flex flex-col overflow-hidden'>
              <div className='w-full h-auto py-2'>
                <p className='font-semibold text-xl text-center'>
                  {Lang.login[status.lang]}
                </p>
              </div>
              <div className='w-full h-full flex flex-col px-4 pt-3'>
                <div className='w-full h-auto pt-2 pb-1 flex justify-between'>
                  <p className='font-semibold text-md text-center'>
                    {Lang.formLogin.phone[status.lang]}
                  </p>
                  <span
                    className={`${
                      !isFetch && "invisible"
                    } flex absolute h-4 w-4 top-2 right-4 -mt-0 -mr-2 justify-center items-center`}
                  >
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-200 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-orange-400'></span>
                  </span>
                </div>
                <div className='w-full h-full flex flex-row gap-2'>
                  <div className='w-auto h-10 flex items-center'>
                    <div className='w-8 h-8 bg-red-400 rounded-full flex flex-col items-center overflow-hidden border'>
                      <div className='w-full h-full bg-red-700'></div>
                      <div className='w-full h-full bg-white'></div>
                    </div>
                  </div>
                  <div className='w-10 h-10 flex items-center justify-center'>
                    <p className='font-bold text-lg text-center'>+62</p>
                  </div>
                  <div className='w-full h-10 border rounded overflow-hidden bg-white/40 backdrop-blur-sm flex items-center'>
                    <p
                      className={`font-bold text-lg ${
                        phone.length < 1 && "text-gray-200"
                      }`}
                    >
                      &nbsp;&nbsp;{phone.length > 0 ? phone : "8214405877"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className='pt-2 text-sm text-red-600 font-normal'>
              {errorMsg && errorMsg.length > 0 && errorMsg}
            </p>
          </div>
        </div>

        <KeypadNumber
          withConfirm={true}
          isFetch={isFetch}
          isTyping={async function (val) {
            await setPhone((phone + val).replace(/^0+/, ""));
          }}
          isDel={async function () {
            (await phone.length) > 0 && setPhone(phone.slice(0, -1));
          }}
          isDone={async function () {
            setErrorMsg("");
            setIsFetch(true);

            const body = {
              phone: "62" + phone,
              uri: "check_phone",
            };

            try {
              const resx = await fetchJson("/api/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
              router.push(
                `/authentication/otp/${resx.uid}/${resx.phone}/${resx.email}`
              );
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
              } else {
                setErrorMsg("An unexpected error happened");
              }
            }

            setIsFetch(false);
          }}
        />

        <Confirm uriBack='/' title={Lang.login[status.lang]} />
      </div>
    </div>
  );
}
