"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import PaymentDiscoutCodeDropDown from "@/features/loghante(root)/payment/components/PaymentDiscoutCodeDropDown";
import Modal from "@/components/shared/modal/Modal";
import Button from "@/components/ui/Button";

import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { getDiscountCode } from "@/lib/api/discount-codes/discount-codes";
import { useShopCart } from "../../context/ShopCartProvider";

type PaymentMethod = "saman" | "melat";
type DiscountData = Awaited<ReturnType<typeof getDiscountCode>>;

interface IModalState {
    active: boolean;
    success: boolean | "warning";
    message: string;
}

// فعلاً هزینه اضافی نداریم؛ بعداً می‌توانی مقادیر واقعی را جایگزین کنی.
const VAT = 0;
const SHIPPING_COST = 0;

function calculateDiscountedAmount(
    amount: number,
    discountPercent: string,
    maxDiscountAmount: string,
) {
    const percent = Math.min(
        100,
        Math.max(0, Number(discountPercent) || 0),
    );

    const maxDiscount = Math.max(
        0,
        Number(maxDiscountAmount) || 0,
    );

    const calculatedDiscount = (amount * percent) / 100;
    const discount = Math.min(calculatedDiscount, maxDiscount);

    return Math.max(0, amount - discount);
}

function CartOrderOverview() {
    const commonT = useTranslations("common");

    const { totalPrice, items, isHydrated } = useShopCart();

    const [selectedPayment, setSelectedPayment] =
        useState<PaymentMethod | null>(null);

    const [discountData, setDiscountData] =
        useState<DiscountData | null>(null);

    const [modal, setModal] = useState<IModalState>({
        active: false,
        success: false,
        message: "",
    });

    // قیمت نهایی محصولات از Context دریافت می‌شود.
    const totalAmount = totalPrice + VAT + SHIPPING_COST;

    const amountPayable = useMemo(() => {
        if (!discountData) return totalAmount;

        return calculateDiscountedAmount(
            totalAmount,
            discountData.data.discountPercent,
            discountData.data.maxDiscountAmount,
        );
    }, [totalAmount, discountData]);

    const discountAmount = totalAmount - amountPayable;

    const closeModal = useCallback(() => {
        setModal((prev) => ({
            ...prev,
            active: false,
        }));
    }, []);

    const handleDiscountData = useCallback((data: DiscountData) => {
        setDiscountData(data);
    }, []);

    const handlePayment = () => {
        if (!isHydrated) return;

        if (items.length === 0) {
            setModal({
                active: true,
                success: "warning",
                message: "Your shopping cart is empty.",
            });
            return;
        }

        if (!selectedPayment) {
            setModal({
                active: true,
                success: "warning",
                message: "Please select a payment method.",
            });
            return;
        }

        // Payment API will be connected here.
    };

    return (
        <>
            <Modal
                active={modal.active}
                message={modal.message}
                success={modal.success}
                onClose={closeModal}
            />

            <div
                className={cn(
                    "col-span-12 fcol gap-y-10",
                    "lg:col-span-5",
                )}
            >
                {/* Order overview */}
                <div className="fcol gap-y-7">
                    <h5 className="text-lg font-semibold">
                        Order overview
                    </h5>

                    <div
                        className={cn(
                            "fcol gap-y-7 rounded-lg",
                            "bg-[var(--blue-opacity-color)]",
                            "px-7 py-10",
                        )}
                    >
                        <div className="fbc gap-4">
                            <span>Total products</span>

                            <span className="shrink-0 font-semibold">
                                {formatPrice(totalPrice)}{" "}
                                {commonT("price-label")}
                            </span>
                        </div>

                        {VAT > 0 && (
                            <div className="fbc gap-4">
                                <span>VAT</span>

                                <span className="shrink-0 font-semibold">
                                    {formatPrice(VAT)}{" "}
                                    {commonT("price-label")}
                                </span>
                            </div>
                        )}

                        {SHIPPING_COST > 0 && (
                            <div className="fbc gap-4">
                                <span>Shipping cost</span>

                                <span className="shrink-0 font-semibold">
                                    {formatPrice(SHIPPING_COST)}{" "}
                                    {commonT("price-label")}
                                </span>
                            </div>
                        )}

                        {discountData && discountAmount > 0 && (
                            <div className="fbc gap-4 text-green-700">
                                <span>
                                    Discount ({discountData.data.discountPercent}%)
                                </span>

                                <span className="shrink-0 font-semibold">
                                    -{formatPrice(discountAmount)}{" "}
                                    {commonT("price-label")}
                                </span>
                            </div>
                        )}

                        <div className="h-[2px] w-full bg-[var(--black-light-color)]/20" />

                        <div className="fbc gap-4 text-lg font-bold">
                            <span>Amount payable</span>

                            <span className="shrink-0 text-blue-utility">
                                {formatPrice(amountPayable)}{" "}
                                {commonT("price-label")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Discount code */}
                <div className="rounded-lg bg-[var(--blue-opacity-color)] py-10">
                    <PaymentDiscoutCodeDropDown
                        color="var(--blue-color)"
                        onDIscountData={handleDiscountData}
                    />
                </div>

                {/* Payment method */}
                <div className="fcol gap-y-7">
                    <h5 className="text-lg font-semibold">
                        Payment method
                    </h5>

                    <div
                        className={cn(
                            "fcol gap-y-3 rounded-lg",
                            "bg-[var(--blue-opacity-color)]",
                            "px-7 py-10",
                        )}
                    >
                        <label
                            htmlFor="payment-saman"
                            className={cn(
                                "flex cursor-pointer items-center gap-3",
                                "rounded-lg border border-transparent p-4",
                                "transition-colors duration-200",
                                selectedPayment === "saman"
                                    ? "bg-[var(--payment-method-selected-bg)]"
                                    : "hover:bg-white/50",
                            )}
                        >
                            <input
                                id="payment-saman"
                                type="radio"
                                name="paymentMethod"
                                value="saman"
                                checked={selectedPayment === "saman"}
                                onChange={() => setSelectedPayment("saman")}
                                className="size-4 shrink-0 cursor-pointer accent-[var(--blue-color)]"
                            />

                            <span>Saman Portal</span>
                        </label>

                        <label
                            htmlFor="payment-melat"
                            className={cn(
                                "flex cursor-pointer items-center gap-3",
                                "rounded-lg border border-transparent p-4",
                                "transition-colors duration-200",
                                selectedPayment === "melat"
                                    ? "bg-[var(--payment-method-selected-bg)]"
                                    : "hover:bg-white/50",
                            )}
                        >
                            <input
                                id="payment-melat"
                                type="radio"
                                name="paymentMethod"
                                value="melat"
                                checked={selectedPayment === "melat"}
                                onChange={() => setSelectedPayment("melat")}
                                className="size-4 shrink-0 cursor-pointer accent-[var(--blue-color)]"
                            />

                            <span>Melat Portal</span>
                        </label>
                    </div>
                </div>

                {/* Payment button */}
                <Button
                    type="button"
                    onClick={handlePayment}
                    disabled={!isHydrated || items.length === 0}
                    className={cn(
                        "w-full gap-2 py-4",
                        "bg-blue-utility",
                        "hover:bg-[var(--blue-hover-color)]",
                        "transition-colors duration-200 font-semibold",
                        "fbc",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                    )}
                >
                    <span className="text-sm">
                        Payment and receipt of tickets
                    </span>

                    <span>
                        {formatPrice(amountPayable)}{" "}
                        {commonT("price-label")}
                    </span>
                </Button>
            </div>
        </>
    );
}

export default CartOrderOverview;
