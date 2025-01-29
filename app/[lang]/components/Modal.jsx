"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function Modal({ children }) {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick = useCallback(
        (e) => {
            if (e.target === overlay.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay]
    );

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <div
            ref={overlay}
            className="fixed z-50 inset-0 bg-black/60 flex justify-center items-center"
            onClick={onClick}
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={wrapper}
                className="relative shadow-lg w-full mx-auto max-w-5xl overflow-y-auto"
                style={{ maxHeight: "90vh" }}
            >
                <button
                    onClick={onDismiss}
                    className="absolute top-0 right-0 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 focus:outline-none transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                    aria-label="Close modal"
                    style={{ zIndex: 1 }}
                >
                    <span className="text-[25px] font-bold">&times;</span>
                </button>
                <div style={{ zIndex: -1 }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
