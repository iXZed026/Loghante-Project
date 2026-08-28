"use client"

import AppLink from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useInput from '@/hooks/useInput';
import { login } from '@/lib/api/auth/login';
import { cn } from '@/lib/utils/cn';
import { saveToLocalStorage } from '@/lib/utils/localStorage';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { GrGoogle } from 'react-icons/gr';

interface ILoginForm {
    googleText: string;
}

function LoginForm({
    googleText,
}: ILoginForm) {

    const loginT = useTranslations("authLogin");
    const locale = useLocale();
    const router = useRouter();

    const [isLoading, setIsLoading] =
        useState<boolean>(false);

    const [
        emailOrPhone,
        ,
        ChangeEailOrPhoneValue,
    ] = useInput("");

    const [
        password,
        ,
        ChangePasswordValue,
    ] = useInput("");

    async function loginSubmitedForm(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setIsLoading(true);

        try {

            const response = await login(
                {
                    emailOrPhone,
                    password,
                },
                locale
            );

            if (!response.success) {
                console.log(response.message);
                alert(response.message);
                return;
            }

            saveToLocalStorage(
                "loginVerificationToken",
                response.data.verificationToken
            );

            alert(response.message)

            router.push(
                `/${locale}/login/verify`
            );

        } catch (error) {

            alert("catch: " + error);
            console.error(error);

        } finally {

            setIsLoading(false);

        }
    }

    return (
        <form
            className={cn(
                "fcol gap-5"
            )}
            onSubmit={loginSubmitedForm}
        >

            <div>
                <span className='text-sm text-black-light-utility'>
                    {loginT("inputs.phone-or-email")}
                </span>

                <Input
                    className={cn(
                        "w-full",
                        "border-b-3 border-[#525252]",
                        "rounded-sm"
                    )}
                    type='text'
                    maxLength={100}
                    value={emailOrPhone}
                    onChange={ChangeEailOrPhoneValue}
                />
            </div>

            <div>
                <span className='text-sm text-black-light-utility'>
                    {loginT("inputs.password")}
                </span>

                <Input
                    className={cn(
                        "w-full",
                        "border-b-3 border-[#525252]",
                        "rounded-sm"
                    )}
                    type="password"
                    maxLength={100}
                    value={password}
                    onChange={ChangePasswordValue}
                />
            </div>

            {/* Forget Password Route */}
            <div className='text-sm text-center hover:opacity-60 transition-all'>
                <AppLink
                    href='/login/forgot-password'
                >
                    {loginT("forgot")}
                </AppLink>
            </div>

            {/* Sign In With Google */}
            <div className='border-2 border-black/30 h-12.5 rounded-lg fcc gap-3 text-sm'>
                <GrGoogle className='size-4 text-purple-500' />

                <span>
                    {googleText}
                </span>
            </div>

            {/* Login Button */}
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
                        : loginT("login-button")
                    }
                </Button>
            </div>

        </form>
    );
}

export default LoginForm;