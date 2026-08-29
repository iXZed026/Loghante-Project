"use client"

import Modal from '@/components/shared/modal/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'
import { verifyLogin } from '@/lib/api/auth/verifyLogin'
import { verifyRegister } from '@/lib/api/auth/verifyRegister'
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

interface IModalState {
    active: boolean;
    success: boolean | "warning";
    message: string;
    pushUrl?: string;
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

    const [modal, setModal] =
        useState<IModalState>({
            active: false,
            success: false,
            message: "",
            pushUrl: undefined,
        });

    const [
        verify,
        ,
        changeVerifyValue,
        clearVerifyValue,
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

            /*
             * Login verification
             */
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

                    setModal({
                        active: true,
                        success: false,
                        message: response.message,
                        pushUrl: undefined,
                    });

                    return;
                }

                removeFromLocalStorage(
                    tokenKey
                );

                saveToLocalStorage(
                    "accessToken",
                    response.data.accessToken
                );

                setModal({
                    active: true,
                    success: true,
                    message: response.message,
                    pushUrl: "/profile",
                });

                clearVerifyValue()

                return;
            }

            /*
             * Register verification
             */
            const response =
                await verifyRegister(
                    {
                        verificationToken,
                        code: verify,
                    },
                    locale
                );

            if (!response.success) {

                setModal({
                    active: true,
                    success: false,
                    message: response.message,
                    pushUrl: undefined,
                });

                return;
            }

            removeFromLocalStorage(
                tokenKey
            );

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl: "/login",
            });

            clearVerifyValue()

        } finally {

            setIsLoading(false);

        }
    }

    if (isCheckingToken) {
        return null;
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
                    }));
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
    );
}

export default VerifyForm;