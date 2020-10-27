import React from 'react';

interface InputProps {
    type: string;
    placeholder: string;
    onChange: (value: string) => void;
    value?: string;
    name?: string;
    autoComplete?: string;
    additionalClasses?: string;
}

export const TextField: React.FC<InputProps> = ({
    type,
    onChange,
    name,
    value,
    placeholder,
    autoComplete,
    additionalClasses,
}) => {
    return (
        <input
            className={`textfield ${additionalClasses}`}
            type={type}
            value={value}
            autoComplete={autoComplete}
            placeholder={placeholder}
            name={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange(event.target.value)
            }
        />
    );
};
