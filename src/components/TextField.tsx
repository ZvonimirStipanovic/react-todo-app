import React from 'react';

interface InputProps {
    type: string;
    placeholder: string;
    onChange: (value: string) => void;
    name?: string;
    autoComplete?: string;
    additionalClasses?: string;
}

export const TextField: React.FC<InputProps> = ({
    type,
    onChange,
    name,
    placeholder,
    autoComplete,
    additionalClasses,
}) => {
    return (
        <input
            className={`textfield ${additionalClasses}`}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            name={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange(event.target.value)
            }
        />
    );
};
