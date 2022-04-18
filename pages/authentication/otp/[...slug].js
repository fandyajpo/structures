import Image from 'next/image'

import OptionOtp from 'components/authentication/optionOtp';
import Confirm from 'components/default/confirm';


import fetchJson, { FetchError } from "lib/fetchJson";

import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from "react";
import * as Lang from 'lib/lang'
import { LangContext } from "context/lang";

import { checkUid } from "lib/arangoDb";

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

  if (context.params.slug.length < 3 ) {
    return reject()
  }

  const checkUids = await checkUid(context.query.slug[0])

  if (checkUids[0].phone !== context.query.slug[1] || checkUids[0].email !== context.query.slug[2] || checkUids[0].blocked) {
    return reject()
  }

  const checkWa = async (phone) => {
    try {
      const resx = await fetchJson(`${process.env.NODE_URL}check_wa`, {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({type: 'node', uri: 'check_wa', phone: phone})})
      return resx.status
    } catch (error) {
      return false
    }
  }

  const wa = await checkWa(context.query.slug[1])

  return {
    props: {
      wa: wa
    },
  }

}

export default function Otp(props) {

  const [isWa, setIsWa] = useState(false)
  const router = useRouter();
  const { status } = useContext(LangContext);

  useEffect(() => {
    setIsWa(props.wa)
  },[])

  return (
    <div className="w-full h-screen relative select-none">

      <div className="w-full h-full bg-white relative p-6">

        {isWa &&
          <OptionOtp
            uri={`/authentication/confirmation/whatsapp/${router.query.slug[0]}/${router.query.slug[1]}`}
            logo="https://res.cloudinary.com/dzfqihfnf/image/upload/v1649219762/logos_whatsapp_lyjgjh.png"
            option="Whatsapp"
            detail={Lang.otp.whatsapp[status.lang]}
          />
        }

        <OptionOtp
          uri={`/authentication/confirmation/sms/${router.query.slug[0]}/${router.query.slug[1]}`}
          logo="https://res.cloudinary.com/dzfqihfnf/image/upload/v1649222627/Vector_tt30oi.png"
          option="SMS"
          detail={Lang.otp.sms[status.lang]}
        />

        <OptionOtp
          uri={`/authentication/confirmation/email/${router.query.slug[0]}/${router.query.slug[2]}`}
          logo="https://res.cloudinary.com/dzfqihfnf/image/upload/c_scale,h_28,w_35/v1649937754/email-icon-100_qv68vj.png"
          option="Email"
          detail={Lang.otp.email[status.lang]}
        />

        <Confirm
          uriBack="/authentication/login"
          title={Lang.otp.confirm[status.lang]}
        />

      </div>

    </div>
  )

}
