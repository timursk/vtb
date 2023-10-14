import { ReadonlyURLSearchParams } from 'next/navigation';

export function getLoadColor(percent: number) {
    if (percent <= 50) {
        return '#E54949';
    } else {
        return '#00FF85';
    }
}

export const createQueryString = (
    name: string,
    value: string,
    searchParams: ReadonlyURLSearchParams
) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    return params.toString();
};

export const debounce = (fn: any, delay: number) => {
    // @ts-ignore
    let timeoutId;
    
    // @ts-ignore
    return (...args) => {
        // @ts-ignore
        clearTimeout(timeoutId);
        // @ts-ignore
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};
