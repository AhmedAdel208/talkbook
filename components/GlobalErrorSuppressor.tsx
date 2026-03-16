'use client';

import { useEffect } from 'react';

/**
 * Suppresses Krisp WASM processor errors from the Vapi SDK globally.
 * This runs in the root layout so it catches errors before any page mounts.
 */
export default function GlobalErrorSuppressor() {
    useEffect(() => {
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const reason = event.reason?.toString?.() || '';
            if (
                reason.includes('WASM_OR_WORKER_NOT_READY') ||
                reason.includes('krisp') ||
                reason.includes('unloading krisp')
            ) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };

        const handleError = (event: ErrorEvent) => {
            const msg = (event.message || '').toLowerCase();
            if (
                msg.includes('wasm_or_worker_not_ready') ||
                msg.includes('krisp')
            ) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return true;
            }
        };

        window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
        window.addEventListener('error', handleError, true);
        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
            window.removeEventListener('error', handleError, true);
        };
    }, []);

    return null;
}
