"use client"
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'

function ForgotPassword() {

    const forgotPassT = useTranslations("authForgotPassword")

    const [
        emailOrPassword,
        ,
        changeEmailOrPasswordValue,
        clearEmailOrPasswordValue
    ] = useInput("")

    return (
        <form
            action=""
            className={cn(
                "fcol gap-10"
            )}
        >
            <div className='text-center text-2xl font-semibold'>
                {forgotPassT("title")}
            </div>
            <div>
                <span className='text-sm text-black-light-utility'>
                    {forgotPassT("inputs.email-or-password")}
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
                    value={emailOrPassword}
                    onChange={changeEmailOrPasswordValue}
                />
            </div>
            {/* Submit Button*/}
            <div>
                <Button
                    className={cn(
                        "h-12.5 w-full",
                        "bg-crimson",
                        "font-bold",
                        "hover:opacity-85",
                    )}
                >
                    {forgotPassT("submit-button")}
                </Button>
            </div>
        </form>
    )
}

export default ForgotPassword