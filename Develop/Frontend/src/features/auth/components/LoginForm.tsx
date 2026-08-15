"use client"
import AppLink from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useInput from '@/hooks/useInput';
import { cn } from '@/lib/utils/cn';
import { useTranslations } from 'next-intl';
import React from 'react'
import { GrGoogle } from 'react-icons/gr';

interface ILoginForm {
    googleText: string;
}

function LoginForm({
    googleText,
}: ILoginForm) {

    const loginT = useTranslations("authLogin")

    const [
        emailOrPhone,
        ,
        ChangeEailOrPhoneValue,
        ClearEmailOrPhoneValue,
    ] = useInput("")

    const [
        password,
        ,
        ChangePasswordValue,
        ClearPasswordValue,
    ] = useInput("")

    return (
        <form
            action=""
            className={cn(
                "fcol gap-5"
            )}
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
                    type="tel"
                    maxLength={11}
                    inputMode="numeric"
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
            {/* SigIn With Google*/}
            <div className='border-2 border-black/30 h-12.5 rounded-lg fcc gap-3 text-sm'>
                <GrGoogle className='size-4 text-purple-500' />
                <span>{googleText}</span>
            </div>
            {/* Next Stage Button*/}
            <div>
                <Button
                    className={cn(
                        "h-12.5 w-full",
                        "bg-crimson",
                        "font-bold",
                        "hover:opacity-85",
                    )}
                >
                    {loginT("login-button")}
                </Button>
            </div>
        </form>
    )
}

export default LoginForm