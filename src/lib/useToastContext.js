import React, { createContext, useContext, useState } from "react";
import TestToast from "../components/common/TestToast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

let addToastGlobal;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = ({ type, title, message, role }) => {
        const newToast = {
            id: Date.now(),
            type: type || null,
            title,
            message,
            role,
        };
        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            removeToast(newToast.id);
        }, 6000);
    };

    addToastGlobal = addToast;

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="toast-container hidden">
                <div className={`toast-outer pt-2 pb-0 md:py-2 md:pt-12 flex flex-col gap-2 items-end`}>
                    {toasts.map((toast) => (
                        <TestToast
                            key={toast.id}
                            type={toast.type}
                            title={toast.title}
                            message={toast.message}
                            role={toast.role}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </div>
            </div>
        </ToastContext.Provider>
    );
};

export const addToast = (title, message) => {
    if (addToastGlobal) {
        addToastGlobal(title, message);
    } else {
        console.error("addToast function is not initialized yet.");
    }
};
