import React from 'react';
import { X } from 'lucide-react';

export function Dialog({ open, onOpenChange, children }) {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onOpenChange(false);
        }
    };

    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />

            {/* Dialog Content */}
            <div className="relative z-10 animate-in zoom-in-95 fade-in duration-200">
                {children}
            </div>
        </div>
    );
}

export function DialogContent({ children, className = '', style = {} }) {
    return (
        <div
            className={`relative bg-gray-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}

export function DialogHeader({ children, onClose, style = {} }) {
    return (
        <div
            className="flex items-center justify-between p-6 border-b"
            style={style}
        >
            {children}
            <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}

export function DialogTitle({ children, className = '', style = {} }) {
    return (
        <h2
            className={`text-xl font-semibold ${className}`}
            style={style}
        >
            {children}
        </h2>
    );
}

export function DialogBody({ children, className = '', style = {} }) {
    return (
        <div
            className={`p-6 overflow-y-auto max-h-[calc(90vh-140px)] ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
