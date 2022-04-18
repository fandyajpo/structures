import Image from 'next/image'

import OptionOtp from 'components/authentication/optionOtp';
import Confirm from 'components/default/confirm';
import KeypadNumber from 'components/default/keypadNumber';

import { checkUid } from "lib/arangoDb";
import fetchJson, { FetchError } from "lib/fetchJson";

import Router, { useRouter } from 'next/router';
import { useContext, useState, useEffect } from "react";
import * as Lang from 'lib/lang'
import { LangContext } from "context/lang";

export async function getServerSideProps(context) {

  const reject = () => {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }

  if (context.params.slug.length < 3) {
    return reject()
  }

  const checkUids = await checkUid(context.query.slug[1])

  if (checkUids[0].blocked) {
    return reject()
  }

  switch (context.query.slug[0]) {
    case "whatsapp":
        if (context.query.slug[2] !== checkUids[0].phone) {
          return reject()
        }
      break;
    case "sms":
        if (context.query.slug[2] !== checkUids[0].phone) {
          return reject()
        }
      break;
    case "email":
        if (context.query.slug[2] !== checkUids[0].email) {
          return reject()
        }
      break;
    default:
      return reject()
  }

  const sendOtp = async (phone) => {
    const body = {type: 'node', uri: 'check_wa', uid: context.query.slug[1], sending: context.query.slug[0], msg: "[#][AlaMerchant]", dst: context.query.slug[2]}
    try {
      const resx = await fetchJson(`${process.env.NODE_URL}send_otp`, {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)})
      return resx.status
    } catch (error) {
      return false
    }
  }

  const wa = await sendOtp(context.query.slug[1])

  return {
    props: {
      otp: wa
    },
  }

}

export default function Confirmation(props) {

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] =  useState(59);

  const [errorMsg, setErrorMsg] =  useState("");
  const [phone, setPhone] =  useState("");

  const [isResend, setIsResend] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  const router = useRouter();
  const { status } = useContext(LangContext);

  const resend = async () => {
    Router.reload(window.location.pathname)
  }

  useEffect(() => {
    router.prefetch(`/profile`)
  },[])

  useEffect(() => {
    if (minutes < 1 && seconds < 1) {
      setIsResend(true)
    }

    const myInterval = setInterval(() => {
      if (seconds > 0) {
          setSeconds(seconds - 1);
      }
      if (seconds === 0) {
          if (minutes === 0) {
              clearInterval(myInterval)
          } else {
              setMinutes(minutes - 1);
              setSeconds(59);
          }
      }
    }, 1000)
    return () => clearInterval(myInterval);
  },[minutes, seconds]);

  return (
    <div className="w-full h-screen select-none">
      <div className="w-full h-full bg-white relative p-6">

        <div className="w-full h-full">

          <p className="w-full h-auto pt-16 font-bold flex justify-center">
          OTP
          </p>
          <p className="w-full h-auto pt-2 flex justify-center">
          {Lang.confirmation.first[status.lang]}
          </p>
          <p className="w-full h-auto pt-2 text-orange-500 flex justify-center">
          {router.query.slug[0].toUpperCase()}
          </p>
          <p className="w-full h-auto pt-2 text-orange-500 flex justify-center">
          {router.query.slug[2]}
          </p>
          <p className="w-full h-auto pt-8 flex justify-center">
          0{minutes}:{seconds < 10 && '0'}{seconds}
          </p>

          <div className="w-full h-auto flex justify-center">
            <div className="w-40 h-auto flex justify-between pt-5">
              <div className={`w-2 h-2 rounded-full ${phone.length >= 1 ? 'bg-orange-500' : 'bg-white' } border border-orange-500`} />
              <div className={`w-2 h-2 rounded-full ${phone.length >= 2 ? 'bg-orange-500' : 'bg-white' } border border-orange-500`} />
              <div className={`w-2 h-2 rounded-full ${phone.length >= 3 ? 'bg-orange-500' : 'bg-white' } border border-orange-500`} />
              <div className={`w-2 h-2 rounded-full ${phone.length >= 4 ? 'bg-orange-500' : 'bg-white' } border border-orange-500`} />
              <div className={`w-2 h-2 rounded-full ${phone.length >= 5 ? 'bg-orange-500' : 'bg-white' } border border-orange-500`} />
              <div className={`w-2 h-2 rounded-full ${phone.length >= 6 ? 'bg-orange-500' : 'bg-white' } border border-orange-500`} />
            </div>
          </div>

          <p className="w-full h-9 pt-5 flex justify-center text-orange-700">
          {errorMsg}
          </p>

          <p className="w-full h-auto pt-5 mb-3 flex justify-center">
          {Lang.confirmation.second[status.lang]}
          </p>

          <div className="w-full h-auto flex justify-center pt-2">
            <button onClick={() => resend()} className={`w-auto h-auto ${!isResend ? 'bg-gray-200' : 'bg-orange-100' } border shadow rounded-md`} disabled={!isResend}>
              <p className="w-auto h-auto text-orange-500 py-2 px-7">{Lang.confirmation.button[status.lang]}</p>
            </button>
          </div>

        </div>

        <KeypadNumber
          withConfirm={true}
          isFetch={isFetch}
          isTyping={async function(val) {
            const save = (phone+val).substring(0, 6)
            await setPhone(save)
          }}
          isDel={async function() {
            await phone.length > 0 && setPhone(phone.slice(0, -1));
          }}
          isDone={async function() {
            setErrorMsg("")
            setIsFetch(true)

            const body = {
              uid: router.query.slug[1],
              otp: phone,
              uri: 'login'
            };

            try {
              const resx = await fetchJson("/api/post", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)})
              router.replace("/profile")
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
              } else {
                setErrorMsg("An unexpected error happened");
              }
            }

            setIsFetch(false)
          }}
        />

        <Confirm
          uriBack="/authentication/login"
          title={Lang.confirmation.confirm[status.lang]}
        />

      </div>
    </div>
  )
}
