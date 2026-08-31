"use client"
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

function EditProfileForm() {

    const editProfileT = useTranslations("profileEdit")

    const [
        fullNameValue,
        ,
        changeFullNameValue,
        clearFullNameValue,
    ] = useInput("");

    const [
        phonedValue,
        setPhoneValue,
        changePhoneValue,
        clearPhoneValue,
    ] = useInput("");

    const [
        emailValue,
        ,
        changeEmailValue,
        clearEmailValue,
    ] = useInput("");

    const [
        passwordValue,
        ,
        changePasswordValue,
        clearPasswordValue,
    ] = useInput("");

    //Date and Bityh
    const [
        dayValue,
        setDayValue,
        changeDayValue,
        clearDayValue,
    ] = useInput("");

    const [
        mounthValue,
        setMounthValue,
        changeMounthValue,
        clearMounthValue,
    ] = useInput("");

    const [
        yearValue,
        setYearValue,
        changeYearValue,
        clearYearValue,
    ] = useInput("");

    const [
        genderValue,
        ,
        changeGenderValue,
        clearGenderValue,
    ] = useInput("");


    return (
        <form>
            <div className='fcol gap-5 lg:w-111 md:w-75 w-full '>
                {/* Full Name */}
                <div className='fcol gap-2.5 text-sm'>
                    <span>
                        {
                            editProfileT("inputs.full-name.title")
                        }
                    </span>
                    <Input
                        className={cn(
                            "border-b-2 border-black-utility rounded-b-sm",
                        )}
                        maxLength={200}
                        placeholder='Danyal Lotfi'
                        type='text'
                        value={fullNameValue}
                        onChange={changeFullNameValue}
                    />
                </div>
                {/* Fhone */}
                <div className='fcol gap-2.5 text-sm'>
                    <span>
                        {
                            editProfileT("inputs.phone.title")
                        }
                    </span>
                    <Input
                        className={cn(
                            "border-b-2 border-black-utility rounded-b-sm",
                        )}
                        maxLength={11}
                        placeholder='09044296231'
                        // type="tel"
                        value={phonedValue}
                        inputMode="numeric"
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            setPhoneValue(value)
                        }}
                    />
                </div>
                {/* Email */}
                <div className='fcol gap-2.5 text-sm'>
                    <span>
                        {
                            editProfileT("inputs.email.title")
                        }
                    </span>
                    <Input
                        className={cn(
                            "border-b-2 border-black-utility rounded-b-sm",
                        )}
                        maxLength={250}
                        placeholder='danyal@gmail.com'
                        type='email'
                        value={emailValue}
                        onChange={changeEmailValue}
                    />
                </div>
                {/* Password */}
                <div className='fcol gap-2.5 text-sm'>
                    <span>
                        {
                            editProfileT("inputs.password.title")
                        }
                    </span>
                    <Input
                        className={cn(
                            "border-b-2 border-black-utility rounded-b-sm",
                        )}
                        maxLength={16}
                        placeholder='Danyal Lotfi'
                        type='password'
                        value={passwordValue}
                        onChange={changePasswordValue}
                    />
                </div>
                {/* Date And Birth */}
                <div className='fcol gap-2.5 text-sm'>
                    <span>
                        {
                            editProfileT("inputs.date.title")
                        }
                    </span>
                    <div className='fbc gap-3'>
                        {/* Day */}
                        <Input
                            className={cn(
                                "h-10",
                                "border-1 border-black-light-utility",
                                "rounded-xl",
                                "px-2 py-10",
                                "text-sm",
                            )}
                            maxLength={2}
                            placeholder={editProfileT("inputs.date.day")}
                            type='text'
                            value={dayValue}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '')
                                setDayValue(value)
                            }}
                        />
                        {/* Mounth */}
                        <Input
                            className={cn(
                                "h-10",
                                "border-1 b,order-black-light-utility",
                                "rounded-xl",
                                "px-2 py-10",
                                "text-sm"
                            )}
                            maxLength={2}
                            placeholder={editProfileT("inputs.date.mounth")}
                            type='text'
                            value={mounthValue}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '')
                                setMounthValue(value)
                            }}
                        />
                        {/* Year */}
                        <Input
                            className={cn(
                                "h-10",
                                "border-1 b,order-black-light-utility",
                                "rounded-xl",
                                "px-2 py-10",
                                "text-sm"
                            )}
                            maxLength={4}
                            placeholder={editProfileT("inputs.date.year")}
                            type='text'
                            value={yearValue}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '')
                                setYearValue(value)
                            }}
                        />
                    </div>
                </div>
                {/* Gender */}
                <div className='fcol gap-7'>
                    <span className='text-sm'>
                        {
                            editProfileT("inputs.gender.title")
                        }
                    </span>
                    <div className="flex justify-center items-center gap-40">
                        <label className="fcc gap-2 cursor-pointer">
                            <Input
                                type="radio"
                                name="gender"
                                value="male"
                            />
                            <span>
                                {editProfileT("inputs.gender.male")}
                            </span>
                        </label>

                        <label className="fcc gap-2 cursor-pointer">
                            <Input
                                type="radio"
                                name="gender"
                                value="female"
                            />
                            <span>
                                {editProfileT("inputs.gender.female")}
                            </span>
                        </label>
                    </div>
                </div>
                {/* Done Button */}
                <div>
                    <Button
                        className={cn(
                            "bg-crimson",
                            "px-4 py-3",
                            "hover:bg-[var(--crimson-hover-color)]"
                        )}>
                        {editProfileT("apply-button")}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default EditProfileForm