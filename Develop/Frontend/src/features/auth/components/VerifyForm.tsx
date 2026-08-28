"use client"

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'
import { verifyLogin } from '@/lib/api/auth/verifyLogin'
import { cn } from '@/lib/utils/cn'
import {
    getLocalStorageItem,
    removeFromLocalStorage,
    saveToLocalStorage
} from '@/lib/utils/localStorage'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface IVerifyForm {
    mode: "login" | "register";
}

function VerifyForm({
    mode,
}: IVerifyForm) {

    const verifyT =
        useTranslations("authVerify");

    const locale =
        useLocale();

    const router =
        useRouter();

    const [isLoading, setIsLoading] =
        useState<boolean>(false);

    const [isCheckingToken, setIsCheckingToken] =
        useState<boolean>(true);

    const [
        verify,
        ,
        changeVerifyValue,
    ] = useInput("");

    const tokenKey =
        mode === "login"
            ? "loginVerificationToken"
            : "registerVerificationToken";

    const redirectPath =
        mode === "login"
            ? `/${locale}/login`
            : `/${locale}/register`;

    useEffect(() => {

        const verificationToken =
            getLocalStorageItem(tokenKey);

        if (!verificationToken) {

            router.replace(
                redirectPath
            );

            return;
        }

        setIsCheckingToken(false);

    }, [
        tokenKey,
        redirectPath,
        router
    ]);

    async function submitVerify(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        const verificationToken =
            getLocalStorageItem(tokenKey);

        if (!verificationToken) {

            router.replace(
                redirectPath
            );

            return;
        }

        setIsLoading(true);

        try {

            if (mode === "login") {

                const response =
                    await verifyLogin(
                        {
                            verificationToken,
                            code: verify,
                        },
                        locale
                    );

                if (!response.success) {

                    console.log(
                        response.message
                    );

                    return;
                }

                removeFromLocalStorage(
                    tokenKey
                );

                saveToLocalStorage(
                    "accessToken",
                    response.data.accessToken
                );

                router.push(
                    `/${locale}/profile`
                );

                return;
            }

            /*
             * Register verification will be implemented
             * when the register verification API is ready.
             */
            console.log(
                "Register verification is not implemented yet."
            );

        } catch (error) {

            console.error(error);

        } finally {

            setIsLoading(false);

        }
    }

    if (isCheckingToken) {
        return null;
    }

    return (
        <div>

            <form
                className={cn(
                    "fcol gap-10"
                )}
                onSubmit={submitVerify}
            >

                <div className='text-center text-2xl font-semibold'>
                    {verifyT("title")}
                </div>

                <div>

                    <div className='text-center mb-10'>
                        <span className='text-black-light-utility'>
                            {verifyT("sent-message")}
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

                {/* Verify Button */}
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
    );
}

export default VerifyForm;