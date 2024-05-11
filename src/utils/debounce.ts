interface PropsDebounce {
    delay: number;
    callback: (...params: any[]) => void;
}

export const debounce = ({ callback, delay }: PropsDebounce) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...params: any[]) => {
        clearTimeout(timeout!);
        timeout = setTimeout(() => {
            callback(...params);
        }, delay);
    };
};
