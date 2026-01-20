// src/hooks/useFacebookPixel.ts
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __fbqLoading?: boolean;
    __fbqInitializedPixels?: Set<string>;
  }
}

/** ✅ Add all pixel IDs here */
const PIXEL_IDS = [
  "1372067637972861",
  "717828674538096",
];

interface PixelOptions {
  eventName?: string;
  eventParams?: Record<string, any>;
}

export function useFacebookPixel(
  { eventName, eventParams }: PixelOptions = {}
) {
  useEffect(() => {
    const ensureLoadedAndTrack = () => {
      if (!window.fbq) return;

      if (!window.__fbqInitializedPixels) {
        window.__fbqInitializedPixels = new Set();
      }

      /** ✅ Init each pixel only once */
      PIXEL_IDS.forEach((pixelId) => {
        if (!window.__fbqInitializedPixels!.has(pixelId)) {
          window.fbq!("init", pixelId);
          window.fbq!("track", "PageView");
          window.__fbqInitializedPixels!.add(pixelId);
        }
      });

      /** ✅ Track custom event on all pixels */
      if (eventName) {
        window.fbq!("track", eventName, eventParams || {});
      }
    };

    /** fbq already exists */
    if (window.fbq) {
      ensureLoadedAndTrack();
      return;
    }

    /** Script already being injected */
    if (window.__fbqLoading) {
      const poll = setInterval(() => {
        if (window.fbq) {
          clearInterval(poll);
          ensureLoadedAndTrack();
        }
      }, 50);
      setTimeout(() => clearInterval(poll), 5000);
      return;
    }

    window.__fbqLoading = true;

    /** Inject Facebook Pixel script */
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
      t.id = "facebook-pixel-script";
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

    /** Wait until fbq is ready */
    const check = setInterval(() => {
      if (window.fbq) {
        clearInterval(check);
        ensureLoadedAndTrack();
      }
    }, 50);

    setTimeout(() => clearInterval(check), 5000);
  }, [eventName, eventParams]);
}
