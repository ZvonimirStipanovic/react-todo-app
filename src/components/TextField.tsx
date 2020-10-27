import React from 'react';

interface InputProps {
    type: string;
    placeholder: string;
    onChange: (value: string) => void;
    name?: string;
    additionalClasses?: string;
}

export const TextField: React.FC<InputProps> = ({
    type,
    onChange,
    name,
    placeholder,
    additionalClasses,
}) => {
    return (
        <input
            className={`textfield ${additionalClasses}`}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange(event.target.value)
            }
        />
    );
};
