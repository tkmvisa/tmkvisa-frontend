"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Label from "@/components/ui/label";
import { Snackbar, Alert } from '@mui/material';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [revelPassword, setReverlPassword] = useState(false)

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (event) => {
    setRememberMe(!rememberMe);
  };

  const router = useRouter();
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save JWT token in localStorage or cookies
        rememberMe ? localStorage.setItem('jwt', data.jwt) : sessionStorage.setItem('jwt', data.jwt);
        setError(false);
        setSnackbarMessage('Login successful!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        router.push(`/${params?.lang}/dashboard`); // Redirect to a protected page
      } else {
        setError(true); // Display error message
        setSnackbarMessage('Login failed! Please check your credentials.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.log(error);
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return (
    <>
      <section className="grid place-items-center w-full">
        <h2 className="mb-5 text-xl md:text-2xl font-bold">Sign In</h2>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Label>Email Address</Label>
            <section>
              <div
                className={`flex justify-between mb-2 items-center gap-3 bg-lite-gray py-[16px] px-5 rounded-[10px] border-[1px] ${isEmailFocused ? "border-success" : "border-border"}`}
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  type="text"
                  placeholder="Input your registered email"
                  className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                />
                {
                  email.includes('@') && <svg
                    width="15"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.2561 0.744078C14.5815 1.06951 14.5815 1.59715 14.2561 1.92259L5.92275 10.2559C5.59732 10.5814 5.06968 10.5814 4.74424 10.2559L0.577574 6.08926C0.252137 5.76382 0.252137 5.23618 0.577574 4.91074C0.903011 4.58531 1.43065 4.58531 1.75609 4.91074L5.3335 8.48816L13.0776 0.744078C13.403 0.418641 13.9306 0.418641 14.2561 0.744078Z"
                      fill="#111827"
                    />
                  </svg>
                }
              </div>
              {error && <ErrorAlert />}
            </section>
            <Label>Password</Label>
            <div className={`flex justify-between items-center gap-3 bg-lite-gray py-[16px] border border-border px-5 rounded-[10px] ${isPasswordFocused ? "border-success" : "border-border"} `}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                type={revelPassword ? "text" : "password"}
                placeholder="Input your password account"
                className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
              />
              {eyeIcon(revelPassword, setReverlPassword)}
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value={rememberMe}
                  onChange={handleChange}
                  className="w-5 h-5 cursor-pointer bg-gray-100 border-gray-300 rounded-md focus:ring-0 checked:bg-green-500 checked:border-green-500"
                />
                <label for="checked-checkbox" className="ms-2 text-sm font-medium text-[#687588] cursor-pointer">Remember Me</label>
              </div>
              <button className="ms-2 cursor-pointer text-sm font-medium text-[#687588]">Forgot Password</button>
            </div>

            <button className="bg-[#F1F2F4] hover:bg-primary text-[#A0AEC0] mt-3 font-bold cursor-pointer p-[14px] rounded-[10px] hover:text-pure">
              Login
            </button>
          </form>
        </div>
      </section>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </>
  );
}



const eyeIcon = (revelPassword, setReverlPassword) => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" onClick={() => setReverlPassword(!revelPassword)}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99987 8.14167C8.69505 8.14167 7.64154 9.19518 7.64154 10.5C7.64154 10.9253 7.75314 11.3221 7.95011 11.6659L11.1657 8.45025C10.8219 8.25328 10.4252 8.14167 9.99987 8.14167ZM6.39154 10.5C6.39154 8.50483 8.00469 6.89167 9.99987 6.89167C10.998 6.89167 11.8966 7.2962 12.5501 7.94973C12.7942 8.19381 12.7942 8.58954 12.5501 8.83361L8.33348 13.0503C8.0894 13.2944 7.69367 13.2944 7.44959 13.0503C6.79607 12.3968 6.39154 11.4982 6.39154 10.5Z" fill="#111827" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.88112 8.00581C3.87355 4.87384 6.79322 2.98334 9.99987 2.98334C11.8746 2.98334 13.6711 3.63634 15.2262 4.80937C15.5018 5.01723 15.5567 5.40913 15.3488 5.6847C15.141 5.96028 14.7491 6.01517 14.4735 5.80731C13.112 4.78033 11.5752 4.23334 9.99987 4.23334C7.32333 4.23334 4.75978 5.80934 2.93555 8.67712L2.93503 8.67794C2.63954 9.14087 2.4707 9.80354 2.4707 10.5042C2.4707 11.2048 2.63954 11.8675 2.93503 12.3304C3.56317 13.3163 4.29079 14.1609 5.07406 14.8345C5.33577 15.0595 5.36547 15.4542 5.1404 15.7159C4.91533 15.9776 4.52072 16.0073 4.25901 15.7822C3.37561 15.0225 2.56961 14.0832 1.88109 13.0025C1.42678 12.2905 1.2207 11.3784 1.2207 10.5042C1.2207 9.62997 1.42679 8.71782 1.88112 8.00581Z" fill="#111827" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3165 6.62133C16.5854 6.40499 16.9789 6.44765 17.1952 6.71661C17.5151 7.11434 17.8294 7.54171 18.1192 7.99845C18.5731 8.71031 18.779 9.62203 18.779 10.4958C18.779 11.37 18.573 12.2822 18.1186 12.9942C16.1262 16.1262 13.2065 18.0167 9.99987 18.0167C8.88609 18.0167 7.79556 17.7812 6.774 17.351C6.45587 17.2171 6.30657 16.8506 6.44051 16.5325C6.57446 16.2143 6.94094 16.065 7.25907 16.199C8.13752 16.5689 9.06365 16.7667 9.99987 16.7667C12.6764 16.7667 15.24 15.1907 17.0642 12.3229L17.0647 12.3221C17.3602 11.8591 17.529 11.1965 17.529 10.4958C17.529 9.79521 17.3602 9.13254 17.0647 8.66961L17.0638 8.66823C16.8037 8.25829 16.518 7.86901 16.2212 7.50006C16.0049 7.23109 16.0475 6.83767 16.3165 6.62133Z" fill="#111827" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0382 10.4687C13.3777 10.5313 13.6021 10.8572 13.5395 11.1967C13.2758 12.6266 12.1181 13.7843 10.6882 14.048C10.3488 14.1106 10.0228 13.8861 9.96023 13.5467C9.89764 13.2072 10.1221 12.8813 10.4615 12.8187C11.3817 12.649 12.1406 11.8901 12.3102 10.97C12.3728 10.6305 12.6988 10.4061 13.0382 10.4687Z" fill="#111827" />
      {!revelPassword && <path fill-rule="evenodd" clip-rule="evenodd" d="M7.94181 12.5581C8.18589 12.8021 8.18589 13.1979 7.94181 13.4419L3.77515 17.6086C3.53107 17.8527 3.13534 17.8527 2.89126 17.6086C2.64718 17.3645 2.64718 16.9688 2.89126 16.7247L7.05793 12.5581C7.30201 12.314 7.69773 12.314 7.94181 12.5581Z" fill="#111827" />}
      {!revelPassword && <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1085 3.3914C17.3526 3.63547 17.3526 4.0312 17.1085 4.27528L12.9418 8.44195C12.6977 8.68602 12.302 8.68602 12.0579 8.44195C11.8139 8.19787 11.8139 7.80214 12.0579 7.55806L16.2246 3.3914C16.4687 3.14732 16.8644 3.14732 17.1085 3.3914Z" fill="#111827" />}
    </svg>
  )
}


const ErrorAlert = () => {
  return (
    <>
      <div className="flex items-start gap-1">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.8125C5.58274 2.8125 2.8125 5.58274 2.8125 9C2.8125 12.4173 5.58274 15.1875 9 15.1875C12.4173 15.1875 15.1875 12.4173 15.1875 9C15.1875 5.58274 12.4173 2.8125 9 2.8125ZM1.6875 9C1.6875 4.96142 4.96142 1.6875 9 1.6875C13.0386 1.6875 16.3125 4.96142 16.3125 9C16.3125 13.0386 13.0386 16.3125 9 16.3125C4.96142 16.3125 1.6875 13.0386 1.6875 9Z" fill="#E03137" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 5.4375C9.31066 5.4375 9.5625 5.68934 9.5625 6V9C9.5625 9.31066 9.31066 9.5625 9 9.5625C8.68934 9.5625 8.4375 9.31066 8.4375 9V6C8.4375 5.68934 8.68934 5.4375 9 5.4375Z" fill="#E03137" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4375 12C8.4375 11.6893 8.68934 11.4375 9 11.4375H9.0075C9.31816 11.4375 9.57 11.6893 9.57 12C9.57 12.3107 9.31816 12.5625 9.0075 12.5625H9C8.68934 12.5625 8.4375 12.3107 8.4375 12Z" fill="#E03137" />
        </svg>
        <p className="text-xs text-danger pt-[1px]">The email you entered is not registered, please check again</p>
      </div>
    </>
  )
}