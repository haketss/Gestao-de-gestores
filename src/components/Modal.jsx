import { memo } from "react";

export const Modal = memo(function Modal(props) {
    if (!props.show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-8 shadow-2xl transform transition-all border dark:border-slate-800">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{props.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">{props.message}</p>
                    <button
                        onClick={props.handleClose}
                        className="w-full inline-flex justify-center px-4 py-2 bg-blue-900 border border-transparent rounded-xl font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
});
