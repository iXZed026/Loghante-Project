"use client"
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'

function NewPasswordForm() {

    const newPasswordT = useTranslations("authNewPassword")

    const [
        newPassword,
        ,
        changeNewPasswordValue,
        clearNewPasswordValue,
    ] = useInput("")

    const [
        repatPassword,
        ,
        changeRepatPasswordValue,
        clearRepatPasswordValue,
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
                    {newPasswordT("title")}
                </div>
                <div className='fcol gap-5'>
                    <div>
                        <span className='text-black-light-utility'>
                            {newPasswordT("inputs.new-password")}
                        </span>
                    </div>
                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm",
                            "italic"
                        )}
                        type="password"
                        maxLength={16}
                        value={newPassword}
                        onChange={changeNewPasswordValue}
                    />
                </div>
                <div className='fcol gap-5'>
                    <div>
                        <span className='text-black-light-utility'>
                            {newPasswordT("inputs.repeat-password")}
                        </span>
                    </div>
                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm",
                            "italic"
                        )}
                        type="password"
                        maxLength={16}
                        value={repatPassword}
                        onChange={changeRepatPasswordValue}
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
                        {newPasswordT("submit-button")}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default NewPasswordForm