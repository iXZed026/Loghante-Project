"use client"
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import React from 'react'

function VerifyForm() {

    const verifyT = useTranslations("authVerify")

    const [
        verify,
        ,
        changeVerifyValue,
        clearVerifyValue,
    ] = useInput("")

    return (
        <div>
            <form
                action=""
                className={cn(
                    "fcol gap-10"
                )}
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
                        type="tel"
                        maxLength={11}
                        inputMode="numeric"
                        value={verify}
                        onChange={changeVerifyValue}
                    />
                </div>
                {/* Verify Button*/}
                <div>
                    <Button
                        className={cn(
                            "h-12.5 w-full",
                            "bg-crimson",
                            "font-bold",
                            "hover:opacity-85",
                        )}
                    >
                        {verifyT("verify-button")}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default VerifyForm