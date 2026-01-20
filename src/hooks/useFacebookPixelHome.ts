// src/hooks/useFacebookPixel.ts
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/** ✅ Both pixel IDs */
const PIXEL_IDS = [
  "1372067637972861",
  "717828674538096",
];

export function useFacebookPixel() {
  useEffect(() => {
    const initAndTrack = () => {
      if (!window.fbq) return;

      PIXEL_IDS.forEach((pixelId) => {
        window.fbq!("init", pixelId);
        window.fbq!("track", "PageView");
      });
    };

    /** If already loaded */
    if (window.fbq) {
      initAndTrack();
      return;
    }

    /** Create fbq queue until script loads */
    (function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode!.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
      null,
      null,
      null
    );

    /** Init both pixels */
    initAndTrack();
  }, []);
}
