"use client"

import Modal from '@/components/shared/modal/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'

import { verifyLogin } from '@/lib/api/auth/verifyLogin'
import { verifyRegister } from '@/lib/api/auth/verifyRegister'
import { verifyForgetPassword } from '@/lib/api/auth/verify-forgot-password'

import { cn } from '@/lib/utils/cn'

import {
    getLocalStorageItem,
    removeFromLocalStorage,
    saveToLocalStorage
} from '@/lib/utils/localStorage'

import { useProfile } from '@/contexts/ProfileProvider'

import {
    useLocale,
    useTranslations
} from 'next-intl'

import { useRouter } from 'next/navigation'

import React, {
    useEffect,
    useState
} from 'react'


interface IVerifyForm {
    mode: "login" | "register" | "forgot-password"
}


interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
}


function VerifyForm({
    mode,
}: IVerifyForm) {

    const verifyT =
        useTranslations("authVerify")

    const locale =
        useLocale()

    const router =
        useRouter()

    const {
        getProfile,
        setProfile,
    } = useProfile()


    const [isLoading, setIsLoading] =
        useState<boolean>(false)


    const [sendingTo, setSendingTo] =
        useState<string>("")


    const [modal, setModal] =
        useState<IModalState>({
            active: false,
            success: false,
            message: "",
            pushUrl: undefined,
        })


    const [
        verify,
        ,
        changeVerifyValue,
        clearVerifyValue,
    ] = useInput("")


    /*
    |--------------------------------------------------------------------------
    | LocalStorage Keys
    |--------------------------------------------------------------------------
    */

    const tokenKey =
        mode === "login"
            ? "loginVerificationToken"
            : mode === "register"
                ? "registerVerificationToken"
                : "forgetPasswordVerificationToken"


    const emailKey =
        mode === "login"
            ? "loginVerificationEmail"
            : mode === "register"
                ? "registerVerificationEmail"
                : "forgetPasswordVerificationEmail"


    /*
    |--------------------------------------------------------------------------
    | Redirect Path
    |--------------------------------------------------------------------------
    */

    const redirectPath =
        mode === "login"
            ? `/${locale}/login`
            : mode === "register"
                ? `/${locale}/register`
                : `/${locale}/login/forgot-password`


    /*
    |--------------------------------------------------------------------------
    | Check Verification Token
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const verificationToken =
            getLocalStorageItem(tokenKey)


        /*
        |--------------------------------------------------------------------------
        | Token Not Found
        |--------------------------------------------------------------------------
        */

        if (!verificationToken) {

           router.replace(redirectPath)

            return
        }


        /*
        |--------------------------------------------------------------------------
        | Get Email
        |--------------------------------------------------------------------------
        */

        const email =
            getLocalStorageItem(emailKey)


        if (email) {

            setSendingTo(email)

        }

    }, [
        tokenKey,
        emailKey,
        redirectPath,
    ])


    /*
    |--------------------------------------------------------------------------
    | Submit Verify
    |--------------------------------------------------------------------------
    */

    async function submitVerify(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault()


        const verificationToken =
            getLocalStorageItem(tokenKey)


        /*
        |--------------------------------------------------------------------------
        | Token Not Found
        |--------------------------------------------------------------------------
        */

        if (!verificationToken) {

            setModal({
                active: true,
                success: false,
                message:
                    "Verification session expired or token not found.",
                pushUrl: redirectPath,
            })

            return
        }


        setIsLoading(true)


        try {

            /*
            |--------------------------------------------------------------------------
            | LOGIN
            |--------------------------------------------------------------------------
            */

            if (mode === "login") {

                const response =
                    await verifyLogin(
                        {
                            verificationToken,
                            code: verify,
                        },
                        locale
                    )


                if (!response.success) {

                    setModal({
                        active: true,
                        success: false,
                        message: response.message,
                        pushUrl: undefined,
                    })

                    return
                }



                saveToLocalStorage(
                    "accessToken",
                    response.data.accessToken
                )


                setProfile({
                    user_Id: response.data.userId,
                    full_name: response.data.fullName,
                    email: response.data.email,
                    phone_number: response.data.phoneNumber,
                    dob: "",
                })


                setModal({
                    active: true,
                    success: true,
                    message: response.message,
                    pushUrl: "/profile",
                })

                removeFromLocalStorage(
                    tokenKey
                )


                clearVerifyValue()

                return
            }


            /*
            |--------------------------------------------------------------------------
            | REGISTER
            |--------------------------------------------------------------------------
            */

            if (mode === "register") {

                const response =
                    await verifyRegister(
                        {
                            verificationToken,
                            code: verify,
                        },
                        locale
                    )


                if (!response.success) {

                    setModal({
                        active: true,
                        success: false,
                        message: response.message,
                        pushUrl: undefined,
                    })

                    return
                }


                removeFromLocalStorage(
                    tokenKey
                )


                setModal({
                    active: true,
                    success: true,
                    message: response.message,
                    pushUrl: "/login",
                })


                clearVerifyValue()

                return
            }


            /*
            |--------------------------------------------------------------------------
            | FORGOT PASSWORD
            |--------------------------------------------------------------------------
            */

            const response =
                await verifyForgetPassword(
                    {
                        verificationToken,
                        code: verify,
                    },
                    locale
                )


            if (!response.success) {

                setModal({
                    active: true,
                    success: false,
                    message: response.message,
                    pushUrl: undefined,
                })

                return
            }


            /*
            |--------------------------------------------------------------------------
            | IMPORTANT:
            | DO NOT REMOVE forgetPasswordVerificationToken HERE
            |--------------------------------------------------------------------------
            |
            | NewPasswordForm still needs this token.
            |
            */

            saveToLocalStorage(
                "forgotPasswordUserId",
                String(response.data.userId)
            )


            saveToLocalStorage(
                "forgotPasswordEmail",
                response.data.email
            )


            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl:
                    "/login/forgot-password/verify/new-password",
            })


            clearVerifyValue()

        } finally {

            setIsLoading(false)

        }
    }


    return (
        <>
            <Modal
                active={modal.active}
                message={modal.message}
                success={modal.success}
                pushUrl={modal.pushUrl}
                onClose={() => {
                    setModal(prev => ({
                        ...prev,
                        active: false,
                    }))
                }}
            />


            <div>

                <form
                    className={cn(
                        "fcol gap-10"
                    )}
                    onSubmit={submitVerify}
                >

                    <div className="text-center text-2xl font-semibold">
                        {verifyT("title")}
                    </div>


                    <div>

                        <div className="text-center mb-10">

                            <span className="text-black-light-utility">

                                {verifyT("sent-message")}
                                {" "}
                                {sendingTo}

                            </span>

                        </div>


                        <Input
                            className={cn(
                                "w-full",
                                "border-b-3 border-[#525252]",
                                "rounded-sm",
                                "italic"
                            )}
                            type="text"
                            maxLength={6}
                            inputMode="numeric"
                            value={verify}
                            onChange={changeVerifyValue}
                        />

                    </div>


                    <div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "h-12.5 w-full",
                                "bg-crimson",
                                "font-bold",
                                "hover:opacity-85",
                            )}
                        >

                            {isLoading
                                ? "Loading..."
                                : verifyT("verify-button")
                            }

                        </Button>

                    </div>

                </form>

            </div>
        </>
    )
}

export default VerifyForm