import Confirm from 'components/default/confirm';
import FormRegister from 'components/authentication/formregister';
import LogoAtas from 'components/default/logoAtas'

import * as Lang from 'lib/lang'

import fetchJson, { FetchError } from "lib/fetchJson";

import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from "react";
import { LangContext } from "context/lang";

export default function Register(props) {

  const router = useRouter()
  const { status } = useContext(LangContext);

  const [isFetch, setIsFetch] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    router.prefetch(`/authentication/otp/[...slug]`)
  },[])

  return (
    <div className="w-full h-full no-swipeback select-none">
      <div className="w-full h-full bg-white">

        <LogoAtas />

        <FormRegister
          setIsHidden={setIsHidden}
          lang={Lang.formDaftar}
          status={status}
          isFetch={isFetch}
          errorMsg={errorMsg}
          onSubmit={async function handleSubmit(e) {
            e.preventDefault();
            setErrorMsg("")
            setIsFetch(true)
            const body = {
              fullname: e.currentTarget.fullname.value,
              email: e.currentTarget.email.value,
              phone: e.currentTarget.phone.value,
              uri: 'register'
            };

            try {
              const resx = await fetchJson("/api/post", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)})
              router.push(`/authentication/otp/${resx.uid}/${body.phone}/${body.email}`)
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
          isHidden={isHidden}
          uriBack="/"
          title={Lang.daftar[status.lang]}
        />

      </div>
    </div>
  )
}
