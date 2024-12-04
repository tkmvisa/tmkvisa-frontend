"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      // router.push("/user/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <section className="grid place-items-center w-full">
      <h2 className="mb-5 text-xl md:text-2xl">Sign In</h2>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="outline-none border-none bg-lite-gray p-[14px] rounded-[6px] text-black placeholder:text-black"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="outline-none border-none bg-lite-gray p-[14px] rounded-[6px] text-black placeholder:text-black"
          />
          <button className="bg-dark hover:bg-dark/90 text-white font-bold cursor-pointer p-[14px] rounded-md">
            Login
          </button>
          {/* {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )} */}

          <Link className="text-sm mb-3 mt-2 text-center" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
          <div className="mb-6">
            <hr/>
            <hr/>
            <div className="flex justify-center -mt-4">
            <p className="text-center bg-white text-gray-40 font-semibold inline-block px-3">or</p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full">
        <button onClick={() => signIn('google')} className="w-full border flex justify-center items-center gap-4 bg-white font-semibold text-dark p-[14px] capitalize rounded-md">
          <Image src="/svg/google.svg" alt="google" width={24} height={24}/>
          Sign Up with Google
        </button>
        <button onClick={() => signIn('facebook')} className="w-full mt-3 border flex justify-center items-center gap-4 bg-white font-semibold text-dark p-[14px] capitalize rounded-md">
          <Image src="/svg/facebook.svg" alt="google" width={24} height={24}/>
          Sign Up with Facebook
        </button>
      </div>
    </section>
  );
}
