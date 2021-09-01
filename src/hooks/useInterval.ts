import { useEffect, useRef } from "react";

export const useInterval = (
    callback: () => void,
    delay: number,
    clearPredicate?: () => boolean,
) => {
    const savedCallback = useRef<null | (() => void)>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current && savedCallback.current();
        };

        const id = setInterval(tick, delay);
        clearPredicate && clearPredicate() && clearInterval(id);
        return () => clearInterval(id);
    }, [delay, clearPredicate]);
};
