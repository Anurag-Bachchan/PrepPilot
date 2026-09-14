import { createContext, useCallback, useContext, useState } from "react";
import "./toast.scss";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [ toasts, setToasts ] = useState([]);

    const showToast = useCallback((message, type = "error") => {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts((prev) => [ ...prev, { id, message, type } ]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast toast--${t.type}`}>{t.message}</div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
