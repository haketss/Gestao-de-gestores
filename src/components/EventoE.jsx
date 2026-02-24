import { memo } from "react";

export const Evento = memo(function Evento(props) {
    function formatarData(dataString) {
        if (!dataString) return "Data não informada";
        const data = new Date(dataString);
        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0");
        const ano = data.getFullYear();
        const horas = data.getHours().toString().padStart(2, "0");
        const minutos = data.getMinutes().toString().padStart(2, "0");
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 leading-tight">
                        {props.evento.nome}
                    </h3>
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Evento
                    </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-gray-900 dark:text-white">Data:</span>
                        <span className="ml-1">{formatarData(props.evento.data)}</span>
                    </div>

                    {props.evento.adendo && (
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900 dark:text-white">Notas da reunião:</span>
                            <p className="mt-1 text-gray-500 dark:text-gray-400 italic">"{props.evento.adendo}"</p>
                        </div>
                    )}

                    {props.evento.idGestor && (
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium text-gray-900 dark:text-white">Gestores:</span>
                            <span className="ml-1">{props.evento.idGestor}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
