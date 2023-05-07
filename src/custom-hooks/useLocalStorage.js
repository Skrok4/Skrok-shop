import { useState } from "react";

export const useLocalStorage = (key, initialValue = "") => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    const setLocalStorageValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setLocalStorageValue];
};

export default useLocalStorage;