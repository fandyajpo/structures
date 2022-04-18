import Image from 'next/image'
import LogoAtas from 'components/default/logoAtas'
import * as Lang from 'lib/lang'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { useContext, useEffect } from "react";
import { LangContext } from "context/lang";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";

import checker from "lib/checker";


// export const getServerSideProps = withIronSessionSsr(async function ({req, res}) {
//   const user = await req.session.user;

//   const check = await checker( user.access_token )
//   const resCheck = await JSON.parse(check)

//   console.log("resCheck", resCheck);

//   // if (user === undefined) {
//   //   res.setHeader("location", "/login");
//   //   res.statusCode = 302;
//   //   res.end();
//   //   return {
//   //     props: {
//   //       user: { isLoggedIn: false, login: "", avatarUrl: "" },
//   //     },
//   //   };
//   // }

//   return {
//     props: {}
//   }
//   // return {
//   //   props: { user: req.session.user },
//   // };
// },sessionOptions);

export default function Home(props) {

  const router = useRouter()
  const { status } = useContext(LangContext);

  return (
    <div className="w-full h-screen relative no-swipeback">
      <div className="w-full h-full bg-white relative select-none">

        <LogoAtas />

        <div className="w-full h-2/4 relative ">
          <div className="w-full h-full mt-1 mb-8 flex justify-end">
            {/*<div className="w-80 h-80 relative " />*/}
            <div className="w-80 h-80 relative">
              <Image src="/static/images/3.png" alt="am2" layout='fill' objectFit='cover' priority={true}/>
            </div>
          </div>
        </div>

        <div className="w-full h-auto max-h-max px-8">
          <p className="text-center text-lg font-semibold antialiased">
            {Lang.index[status.lang]}
          </p>
        </div>

        <div className="w-full h-32 absolute bottom-0 inset-x-0 px-6 flex gap-4 justify-center items-center flex-col bg-transparent">
          <Link href={'/authentication/login'} passHref>
            <button className="w-full h-10 inline-flex relative overflow-hidden rounded-full bg-yellow-500 font-semibold text-sm text-white flex justify-center items-center hover:bg-yellow-400 transition ease-in-out duration-150 cursor-not-allowed">
              {Lang.login[status.lang]}
            </button>
          </Link>

          <Link href={'/authentication/register'} passHref>
            <button type="button" className="w-full h-10 inline-flex overflow-hidden bg-gray-50 relative rounded-full shadow font-semibold text-sm text-yellow-500 flex justify-center items-center hover:bg-gray-100 transition ease-in-out duration-150 cursor-not-allowed">
              {Lang.daftar[status.lang]}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
