import { useEffect, MutableRefObject } from "react";
import _ from "lodash";

export const useScroll = (ref: MutableRefObject<number>) => {
  useEffect(() => {
    const listener = _.debounce(() => {
      if (window.pageYOffset > ref.current) {
        console.log("windows Y", window.pageYOffset);
      }
      ref.current = window.pageYOffset;
    }, 500);
    document.addEventListener("scroll", listener);
    return () => document.removeEventListener("scroll", listener);
  }, [ref]);
};
