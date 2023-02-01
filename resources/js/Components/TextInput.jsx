import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        step,
        minLength,
        maxLength,
        min,
        max,
        isFocused,
        handleChange
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                step={step}
                minLength={minLength}
                maxLength={maxLength}
                min={min}
                max={max}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});
