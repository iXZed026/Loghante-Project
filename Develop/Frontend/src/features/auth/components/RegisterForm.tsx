"use client"
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import { GrGoogle } from 'react-icons/gr'

interface IRegisterForm {
  googleText: string
}

function RegisterForm({
  googleText
}: IRegisterForm) {

  const RegisterT = useTranslations("authRegister")

  const [
    fullName,
    ,
    changeFullNameValue,
    clearFullNameValue
  ] =
    useInput("")
  const [
    phone,
    setPhone,
    changePhoneValue,
    clearPhoneValue
  ] =
    useInput("")
  const [
    email,
    ,
    changeEmailValue,
    clearEmailValue
  ] =
    useInput("")
  const [
    password,
    ,
    changePasswordValue,
    clearPasswordValue
  ] =
    useInput("")
  const [
    repPassword,
    ,
    changeRepPasswordValue,
    clearRepPasswordValue
  ] =
    useInput("")

  return (
    <form
      action=""
      className={cn(
        "fcol gap-5"
      )}
    >
      <div>
        <span className='text-sm text-black-light-utility'>
          {RegisterT("inputs.name")}
        </span>
        <Input
          className={cn(
            "w-full",
            "border-b-3 border-[#525252]",
            "rounded-sm"
          )}
          type='text'
          maxLength={100}
          value={fullName}
          onChange={changeFullNameValue}
        />
      </div>
      <div>
        <span className='text-sm text-black-light-utility'>
          {RegisterT("inputs.phone")}
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
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '')
            setPhone(value)
          }}
        />
      </div>
      <div>
        <span className='text-sm text-black-light-utility'>
          {RegisterT("inputs.email")}
        </span>
        <Input
          className={cn(
            "w-full",
            "border-b-3 border-[#525252]",
            "rounded-sm"
          )}
          type='text'
          maxLength={150}
          value={email}
          onChange={changeEmailValue}
        />
      </div>
      <div>
        <span className='text-sm text-black-light-utility'>
          {RegisterT("inputs.password")}
        </span>
        <Input
          className={cn(
            "w-full",
            "border-b-3 border-[#525252]",
            "rounded-sm"
          )}
          maxLength={16}
          type='password'
          value={password}
          onChange={changePasswordValue}
        />
      </div>
      <div>
        <span className='text-sm text-black-light-utility'>
          {RegisterT("inputs.rep-password")}
        </span>
        <Input
          className={cn(
            "w-full",
            "border-b-3 border-[#525252]",
            "rounded-sm"
          )}
          type='password'
          maxLength={16}
          value={repPassword}
          onChange={changeRepPasswordValue}
        />
      </div>
      {/* Privacy */}
      <div className='text-center text-sm'>
        <span>
          {RegisterT("policy")}
        </span>
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
          {RegisterT("submit-button")}
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm