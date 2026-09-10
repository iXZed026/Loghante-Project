import { DEVELOPMENT } from "../constants";

export function saveToLocalStorage(
    itemName: string,
    data: string,
): void {

    if (data === undefined || data === null) {

        if (DEVELOPMENT) {
            console.warn(
                `Cannot save "${itemName}" because the value is undefined or null.`
            );
        }

        return;
    }

    localStorage.setItem(
        itemName,
        JSON.stringify(data)
    );
}

export function getLocalStorageItem(
    itemName: string
): string | null {

    const item =
        localStorage.getItem(itemName);

    if (item === null) {
        return null;
    }

    try {

        const parsedItem =
            JSON.parse(item);

        if (
            parsedItem === undefined ||
            parsedItem === null
        ) {

            localStorage.removeItem(itemName);

            return null;
        }

        return parsedItem;

    } catch (error) {

        if (DEVELOPMENT) {
            console.error(
                `Failed to parse localStorage item "${itemName}".`,
                error
            );
        }

        localStorage.removeItem(itemName);

        return null;
    }
}

export function removeFromLocalStorage(
    itemName: string
): void {
    localStorage.removeItem(itemName);
}