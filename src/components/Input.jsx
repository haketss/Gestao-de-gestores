import { memo } from "react";

export const Input = memo(function Input(props) {
    return (
        <div className={`relative mb-4 ${props.className || ""}`}>
            <div className="relative">
                <input
                    type={props.type}
                    id={props.name}
                    name={props.name}
                    placeholder={props.placeholder || " "}
                    required={props.required}
                    defaultValue={props.defaultValue}
                    {...props.validations}
                    className={`block w-full px-4 py-3 text-gray-900 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${props.error ? "border-red-500" : "border-gray-300"
                        }`}
                />
                <label
                    htmlFor={props.name}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                >
                    {props.label || props.placeholder}
                </label>
            </div>
            {props.error && (
                <p className="mt-1 text-xs text-red-500">
                    {props.error.message}
                </p>
            )}
        </div>
    );
});
