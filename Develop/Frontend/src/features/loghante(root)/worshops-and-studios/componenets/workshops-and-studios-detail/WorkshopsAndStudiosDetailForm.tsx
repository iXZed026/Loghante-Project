"use client";

import Input from '@/components/ui/Input'
import useInput from '@/hooks/useInput'
import useRemoveHashOnExit from '@/hooks/useRemoveHashOnExit'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import React from 'react'

function WorkshopsAndStudiosDetailForm() {

    const wsAndStdsInputsT =
        useTranslations("workshopsAndStudios.page.inputs");

    useRemoveHashOnExit(
        "workshops-and-studios-form"
    );

    // Full Name
    const [
        fullName,
        ,
        changeFullName,
    ] = useInput("");

    // Phone Or Email
    const [
        phoneOrEmail,
        ,
        changePhoneOrEmail,
    ] = useInput("");

    // Company Name
    const [
        companyName,
        ,
        changeCompanyName,
    ] = useInput("");

    return (
        <form
            id="workshops-and-studios-form"
            className={cn(
                "fcol gap-y-10",
                "scroll-mt-[120px]",
                "py-15",
            )}
        >

            <div>
                <span className="font-bold text-xl">
                    {wsAndStdsInputsT("title")}
                </span>
            </div>

            <div
                className={cn(
                    "grid grid-cols-12 gap-5 md:px-10"
                )}
            >

                {/* Full Name */}
                <div
                    className={cn(
                        "py-2 px-3",
                        "lg:col-span-4",
                        "sm:col-span-6",
                        "col-span-12",
                        "fcol md:gap-y-3 gap-y-1"
                    )}
                >
                    <span className="text-sm font-semibold text-black-light-utility">
                        {wsAndStdsInputsT("full-name")}:
                    </span>

                    <Input
                        value={fullName}
                        onChange={changeFullName}
                        className={cn(
                            "border-b-3",
                            "border-l border-r border-t",
                            "border-b-[var(--black-light-color)]",
                            "border-r-[var(--white-light-color)]",
                            "border-t-[var(--white-light-color)]",
                            "border-l-[var(--white-light-color)]",
                            "focus:bg-[var(--white-light-color)]",
                            "transition-colors",
                            "rounded-xs",
                            "h-15"
                        )}
                    />
                </div>

                {/* Phone Or Email */}
                <div
                    className={cn(
                        "py-2 px-3",
                        "lg:col-span-4",
                        "sm:col-span-6",
                        "col-span-12",
                        "fcol md:gap-y-3 gap-y-1"
                    )}
                >
                    <span className="text-sm font-semibold text-black-light-utility">
                        {wsAndStdsInputsT("email-or-phone")}:
                    </span>

                    <Input
                        value={phoneOrEmail}
                        onChange={changePhoneOrEmail}
                        className={cn(
                            "border-b-3",
                            "border-l border-r border-t",
                            "border-b-[var(--black-light-color)]",
                            "border-r-[var(--white-light-color)]",
                            "border-t-[var(--white-light-color)]",
                            "border-l-[var(--white-light-color)]",
                            "focus:bg-[var(--white-light-color)]",
                            "transition-colors",
                            "rounded-xs",
                            "h-15"
                        )}
                    />
                </div>

                {/* Company Name */}
                <div
                    className={cn(
                        "py-2 px-3",
                        "lg:col-span-4",
                        "sm:col-span-6",
                        "col-span-12",
                        "fcol md:gap-y-3 gap-y-1"
                    )}
                >
                    <span className="text-sm font-semibold text-black-light-utility">
                        {wsAndStdsInputsT("company-name")}:
                    </span>

                    <Input
                        value={companyName}
                        onChange={changeCompanyName}
                        className={cn(
                            "border-b-3",
                            "border-l border-r border-t",
                            "border-b-[var(--black-light-color)]",
                            "border-r-[var(--white-light-color)]",
                            "border-t-[var(--white-light-color)]",
                            "border-l-[var(--white-light-color)]",
                            "focus:bg-[var(--white-light-color)]",
                            "transition-colors",
                            "rounded-xs",
                            "h-15"
                        )}
                    />
                </div>

            </div>

        </form>
    );
}

export default WorkshopsAndStudiosDetailForm;