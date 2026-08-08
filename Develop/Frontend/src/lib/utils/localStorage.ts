import { json } from "stream/consumers";
import { DEVELOPMENT } from "../constants";
import { SiTruenas } from "react-icons/si";

export function saveToLocalStorage(
    itemName: string,
    data: string,
) {
    localStorage.setItem(itemName, JSON.stringify(data))

}

export function getLocalStorageItem(
    itemName: string
): string | null {
    const getLocalStorageItem = JSON.parse(
        localStorage.getItem(itemName) as string
    )

    if (!getLocalStorageItem) {
        if (DEVELOPMENT) {
            console.warn(
                `item name:${itemName} in localstorage not found!`
            )
        }
        return null
    };

    return getLocalStorageItem

}