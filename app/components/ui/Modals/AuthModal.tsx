"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"

import { TAPIRegister } from "@/api/auth/register/route"
import { useForm } from "react-hook-form"
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai"
import supabaseClient from "@/libs/supabaseClient"
import axios from "axios"

import FormInput from "../Inputs/Validation/FormInput"
import ContinueWithButton from "@/(auth)/components/ContinueWithButton"
import { Button, Checkbox, ModalContainer } from ".."
import { Timer } from "@/(auth)/components"
import { twMerge } from "tailwind-merge"
import { pusherClient } from "@/libs/pusher"

//TODO - its trash code - reduce line amount of line

interface AdminModalProps {
  label: string
}

interface FormData {
  username: string
  email: string
  emailOrUsername: string
  password: string
}

export function AuthModal({ label }: AdminModalProps) {
  const router = useRouter()

  const emailInputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const queryParams = useSearchParams().get("variant")
  const [isChecked, setIsChecked] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isAuthCompleted, setIsAuthCompleted] = useState(false)
  const [responseMessage, setResponseMessage] = useState<React.ReactNode>(<p></p>)
  //for case when user click 'Forgot password?' or 'Create account' and some data in responseMessage
  useEffect(() => {
    setResponseMessage(<p></p>)
  }, [queryParams])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const { ref, ...restEmail } = register("email")
  const { ...restemailOrUsername } = register("emailOrUsername")
  const { ...restPassword } = register("password")
  const { ...restUsername } = register("username")

  //when user submit form and got response message from server
  function displayResponseMessage(message: React.ReactNode) {
    setResponseMessage(message)
  }

  useEffect(() => {
    if (isAuthCompleted) router.push("?modal=AuthModal&variant=authCompleted")
    // else router.push("?modal=AuthModal&variant=login")
  }, [isAuthCompleted, router])

  useEffect(() => {
    function authCompletedHandler() {
      setIsAuthCompleted(true)
    }

    pusherClient.bind("auth:completed", authCompletedHandler)
    return () => {
      if (emailInputRef.current?.value) {
        pusherClient.unsubscribe(emailInputRef.current?.value)
      }
      pusherClient.unbind("auth:completed", authCompletedHandler)
    }
  }, [])

  async function signInWithPassword(emailOrUsername: string, password: string) {
    //Check user wants login with email or username
    const isEmail = emailOrUsername.includes("@")
    if (isEmail) {
      try {
        const { data: user, error: signInError } = await supabaseClient.auth.signInWithPassword({
          email: emailOrUsername,
          password: password,
        })
        if (signInError) {
          const error_description = encodeURIComponent(signInError.message)
          router.push(`/error?error_description=${error_description}`)
        }

        if (user.user) {
          //store info somewhere (e.g in localStorage with zustand)
          displayResponseMessage(<p className="text-success">You are logged in</p>)
          reset()
          router.refresh()
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          displayResponseMessage(<p className="text-danger">{error.message}</p>)
        } else {
          displayResponseMessage(
            <div className="text-danger flex flex-row">
              <p>An unknown error occurred - contact admin&nbsp;</p>
              <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
                here
              </Button>
            </div>,
          )
        }
      }
    } else {
      try {
        const { data: email, error: emailSelectError } = await supabaseClient
          .from("users")
          .select("email")
          .eq("username", emailOrUsername)
        if (emailSelectError) throw emailSelectError
        if (email && email.length > 0) {
          const { data: user, error: signInError } = await supabaseClient.auth.signInWithPassword({
            email: email[0].email,
            password: password,
          })
          if (signInError) throw signInError

          if (user.user) {
            //store info somewhere (e.g in localStorage with zustand)
            displayResponseMessage(<p className="text-success">You are logged in</p>)
            reset()
            router.refresh()
          }
        } else {
          displayResponseMessage(<p className="text-danger">No user with this username</p>)
        }
      } catch (error) {
        if (error instanceof Error) {
          displayResponseMessage(<p className="text-danger">{error.message}</p>)
        } else {
          displayResponseMessage(
            <div className="text-danger flex flex-row">
              <p>An unknown error occurred - contact admin&nbsp;</p>
              <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
                here
              </Button>
            </div>,
          )
        }
      }
    }
  }

  async function signUp(username: string, email: string, password: string) {
    try {
      const signUpResponse = await axios
        .post("/api/auth/register", {
          username: username,
          email: email,
          password: password,
        } as TAPIRegister)
        .catch(error => {
          throw new Error(error.response.data.error)
        })

      if (
        signUpResponse.data.error ===
        "It seems like you use temp-mail - please use actuall email\n\n    So you can recover your password and get access to support"
      ) {
        throw new Error(signUpResponse.data.error)
      }

      setIsEmailSent(true)
      if (emailInputRef.current) {
        pusherClient.subscribe(emailInputRef.current?.value)
      }
      setResponseMessage(<p className="text-success">Check your email</p>)
      setTimeout(() => {
        setResponseMessage(
          <div className="flex flex-row">
            Don&apos;t revice email?&nbsp;
            <Timer label="resend in" seconds={20}>
              <Button type="button" variant="link" onClick={() => resendVerificationEmail(email)}>
                resend
              </Button>
            </Timer>
          </div>,
        )
      }, 5000)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User exists - check your email\n You might not verified your email") {
          displayResponseMessage(
            <p className="text-danger">
              User exists - check your email
              <br />
              You might not verified your email
            </p>,
          )
        } else {
          displayResponseMessage(<p className="text-danger">{error.message}</p>)
        }
      } else {
        displayResponseMessage(
          <div className="text-danger flex flex-row">
            <p>An unknown error occurred - contact admin&nbsp;</p>
            <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
              here
            </Button>
          </div>,
        )
      }
    }
  }

  async function resendVerificationEmail(email: string) {
    try {
      const { error } = await supabaseClient.auth.resend({
        type: "signup",
        email: email,
      })
      if (error) throw error
      displayResponseMessage(
        <div className="flex flex-col">
          <div className="text-success flex flex-row justify-center">
            <p>Email resended -&nbsp;</p>
            <Button
              className="text-brand"
              variant="link"
              type="button"
              onClick={() => {
                setIsEmailSent(false)
                setTimeout(() => {
                  emailInputRef.current?.focus()
                }, 50)
              }}>
              change email
            </Button>
          </div>
          <p>If you don&apos;t recieve an email - check &apos;Spam&apos; and &apos;All mail&apos;</p>
        </div>,
      )
    } catch (error) {
      if (error instanceof Error) {
        displayResponseMessage(<p className="text-danger">{error.message}</p>)
      } else {
        displayResponseMessage(
          <div className="text-danger flex flex-row">
            <p>An unknown error occurred - contact admin&nbsp;</p>
            <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
              here
            </Button>
          </div>,
        )
      }
    }
  }

  async function recoverPassword(email: string) {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/?modal=AuthModal&variant=reset-password`,
      })
      if (error) throw error
      displayResponseMessage(<p className="text-success">Check your email</p>)
    } catch (error) {
      if (error instanceof Error) {
        displayResponseMessage(<p className="text-danger">{error.message}</p>)
      } else {
        displayResponseMessage(
          <div className="text-danger flex flex-row">
            <p>An unknown error occurred - contact admin&nbsp;</p>
            <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
              here
            </Button>
          </div>,
        )
      }
    }
  }

  async function resetPassword(password: string) {
    try {
      //TODO - check if this password already belong to current email
      const { error } = await supabaseClient.auth.updateUser({ password: password })
      if (error) throw error
      displayResponseMessage(<p className="text-success">Your password changed</p>)
      router.push("/")
    } catch (error) {
      if (error instanceof Error && error.message === "New password should be different from the old password.") {
        displayResponseMessage(<p className="text-danger">Its already your password - enter new one</p>)
      } else if (error instanceof Error) {
        displayResponseMessage(<p className="text-danger">{error.message}</p>)
      } else {
        displayResponseMessage(
          <div className="text-danger flex flex-row">
            <p>An unknown error occurred - contact admin&nbsp;</p>
            <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
              here
            </Button>
          </div>,
        )
      }
    }
  }

  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (queryParams === "login") {
      signInWithPassword(data.emailOrUsername, data.password)
    } else if (queryParams === "register") {
      signUp(data.username, data.email, data.password)
      // reset()
    } else if (queryParams === "recover") {
      recoverPassword(data.email)
      // reset()
    } else {
      resetPassword(data.password)
    }
  }

  return (
    <ModalContainer
      className={`w-[500px] 
    ${queryParams === "login" ? "h-[550px]" : queryParams === "register" ? "h-[625px]" : "h-[325px]"}
${
  //for login height when errors
  queryParams === "login" && (errors.emailOrUsername || errors.password) && "!h-[610px]"
}
${
  //for register height when errors
  queryParams === "register" && (errors.email || errors.password) && "!h-[720px]"
} 
${
  //for reset-password height when errors
  queryParams === "recover" && errors.password && "!h-[350px]"
}
${
  //for reset-password height when errors
  queryParams === "authCompleted" && "!h-[250px]"
}
transition-all duration-500`}
      modalQuery="AuthModal">
      <div className="flex flex-col justify-center gap-y-2 w-[90%] mx-auto">
        <div className="flex flex-row gap-x-4 items-center h-[100px]">
          <Image className="w-[30px] h-[40px]" src="/big-dark.png" alt="logo" width={80} height={100} />
          <h1 className="text-4xl font-bold">
            {queryParams === "login"
              ? "Login"
              : queryParams === "register"
              ? "Register"
              : queryParams === "recover"
              ? "Recover"
              : "Auth completed"}
          </h1>
        </div>

        {queryParams === "login" || queryParams === "register" || queryParams === "recover" ? (
          <>
            <form
              className="relative max-w-[450px] w-[75vw] flex flex-col gap-y-2 mb-4"
              onSubmit={handleSubmit(onSubmit)}>
              {queryParams !== "login" && queryParams !== "recover" && (
                <FormInput
                  {...restEmail}
                  endIcon={<AiOutlineMail size={24} />}
                  register={register}
                  errors={errors}
                  id="email"
                  label="Email"
                  placeholder="user@big.com"
                  disabled={isSubmitting || isEmailSent}
                  ref={e => {
                    ref(e)
                    //@ts-ignore
                    emailInputRef.current = e // you can still assign to ref
                  }}
                  required
                />
              )}
              {queryParams === "login" && (
                <FormInput
                  {...restemailOrUsername}
                  endIcon={<AiOutlineUser size={24} />}
                  register={register}
                  errors={errors}
                  id="emailOrUsername"
                  label="Email or username"
                  placeholder="HANTARESpeek"
                  disabled={isSubmitting}
                  required
                />
              )}
              {queryParams !== "recover" && (
                <FormInput
                  {...restPassword}
                  endIcon={<AiOutlineLock size={24} />}
                  register={register}
                  errors={errors}
                  id="password"
                  label="Password"
                  type="password"
                  placeholder={queryParams === "register" ? "NeW-RaNd0m_PasWorD" : "RaNd0m_PasWorD"}
                  disabled={isSubmitting || isEmailSent}
                  required
                />
              )}
              {queryParams === "register" && (
                <FormInput
                  {...restUsername}
                  endIcon={<AiOutlineUser size={24} />}
                  register={register}
                  errors={errors}
                  id="username"
                  label="Username"
                  placeholder="HANTARESpeek"
                  disabled={isSubmitting || isEmailSent}
                  required
                />
              )}
              {/* LOGIN-BODY-HELP */}
              <div className="flex justify-between mb-2">
                <div className={`${(queryParams === "recover" || queryParams === "register") && "invisible"}`}>
                  {/* 'Remember me' now checkbox do nothing - expected !isChecked 1m jwt - isChecked 3m jwt */}
                  <Checkbox
                    className="bg-background cursor-pointer"
                    label="Remember me"
                    onChange={() => setIsChecked(isChecked => !isChecked)}
                    disabled={isSubmitting}
                    isChecked={isChecked}
                  />
                </div>
                {queryParams !== "register" && (
                  <Button
                    href={`${pathname}?modal=AuthModal&variant=${queryParams === "login" ? "recover" : "login"}`}
                    variant="link">
                    {queryParams === "login" ? "Forgot password?" : "Remember password?"}
                  </Button>
                )}
              </div>

              <Button variant="default-outline" disabled={isSubmitting || isEmailSent}>
                {queryParams === "login"
                  ? "Login"
                  : queryParams === "register"
                  ? "Register"
                  : queryParams === "recover"
                  ? "Reset password"
                  : "Send email"}
              </Button>
              <div className="flex justify-center text-center">{responseMessage}</div>
            </form>

            {/* CONTINUE WITH (for login and register only) */}
            {(queryParams === "login" || queryParams === "register") && (
              <section className="flex flex-col gap-y-4 text-center">
                <p>or continue with</p>
                <div
                  className={`grid grid-cols-3 gap-x-2 ${
                    isSubmitting && "opacity-50 cursor-default pointer-events-none"
                  }`}>
                  <ContinueWithButton provider="google" />
                  <ContinueWithButton provider="faceit" />
                  <ContinueWithButton provider="twitter" />
                </div>
                <Button
                  className={twMerge(`pr-1`, isEmailSent && "opacity-50 pointer-events-none cursor-default")}
                  href={`${pathname}?modal=AuthModal&variant=${queryParams === "login" ? "register" : "login"}`}
                  variant="link"
                  disabled={isEmailSent}>
                  {queryParams === "login" ? "Create account" : "Login"}
                </Button>
              </section>
            )}
          </>
        ) : queryParams === "authCompleted" && isAuthCompleted === true ? (
          <div className="flex flex-col w-full">
            <p>image</p>
            <p className="text-success">Auth completed - Thank you!</p>
          </div>
        ) : (
          <h1 className="w-full h-[125px] flex justify-center items-center">
            Now change query params back to &variant=login :)
          </h1>
        )}
      </div>
    </ModalContainer>
  )
}
