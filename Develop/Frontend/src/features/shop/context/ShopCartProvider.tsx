
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    getLocalStorageItem,
    saveToLocalStorage,
} from "@/lib/utils/localStorage";

const CART_STORAGE_KEY = "loghanteh-shopping-cart";

export interface CartItem {
    productId: number;
    productVariantId?: number;
    name: string;
    museumName: string;
    imageUrl: string;
    price: number;
    finalPrice: number;
    discountPercent: number;
    quantity: number;
    stockQuantity: number;
    color?: string;
    sku?: string;
}

interface AddToCartInput extends Omit<CartItem, "quantity"> {
    quantity: number;
}

interface ShopCartContextType {
    items: CartItem[];
    isHydrated: boolean;
    totalItems: number;
    totalPrice: number;
    addToCart: (item: AddToCartInput) => void;
    removeFromCart: (productId: number, variantId?: number) => void;
    updateQuantity: (
        productId: number,
        variantId: number | undefined,
        quantity: number,
    ) => void;
    clearCart: () => void;
}

const ShopCartContext = createContext<ShopCartContextType | null>(null);

export function ShopCartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Read the saved cart once on the client.
    useEffect(() => {
        const savedCart = getLocalStorageItem<CartItem[]>(CART_STORAGE_KEY);

        if (Array.isArray(savedCart)) {
            setItems(savedCart);
        }

        setIsHydrated(true);
    }, []);

    // Persist cart changes only after localStorage has been read.
    useEffect(() => {
        if (!isHydrated) return;

        saveToLocalStorage(CART_STORAGE_KEY, items);
    }, [items, isHydrated]);

    const addToCart = useCallback((newItem: AddToCartInput) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) =>
                    item.productId === newItem.productId &&
                    item.productVariantId === newItem.productVariantId,
            );

            if (!existingItem) {
                return [...currentItems, newItem];
            }

            return currentItems.map((item) => {
                const isSameItem =
                    item.productId === newItem.productId &&
                    item.productVariantId === newItem.productVariantId;

                if (!isSameItem) return item;

                return {
                    ...item,
                    quantity: Math.min(
                        item.stockQuantity,
                        item.quantity + newItem.quantity,
                    ),
                };
            });
        });
    }, []);

    const removeFromCart = useCallback(
        (productId: number, variantId?: number) => {
            setItems((currentItems) =>
                currentItems.filter(
                    (item) =>
                        !(
                            item.productId === productId &&
                            item.productVariantId === variantId
                        ),
                ),
            );
        },
        [],
    );

    const updateQuantity = useCallback(
        (
            productId: number,
            variantId: number | undefined,
            quantity: number,
        ) => {
            setItems((currentItems) =>
                currentItems.map((item) => {
                    const isSameItem =
                        item.productId === productId &&
                        item.productVariantId === variantId;

                    if (!isSameItem) return item;

                    return {
                        ...item,
                        quantity: Math.min(
                            item.stockQuantity,
                            Math.max(1, quantity),
                        ),
                    };
                }),
            );
        },
        [],
    );

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = useMemo(
        () => items.reduce((total, item) => total + item.quantity, 0),
        [items],
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (total, item) => total + item.finalPrice * item.quantity,
                0,
            ),
        [items],
    );

    const value = useMemo(
        () => ({
            items,
            isHydrated,
            totalItems,
            totalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        }),
        [
            items,
            isHydrated,
            totalItems,
            totalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        ],
    );

    return (
        <ShopCartContext.Provider value={value}>
            {children}
        </ShopCartContext.Provider>
    );
}

export function useShopCart() {
    const context = useContext(ShopCartContext);

    if (!context) {
        throw new Error(
            "useShopCart must be used within ShopCartProvider",
        );
    }

    return context;
}
