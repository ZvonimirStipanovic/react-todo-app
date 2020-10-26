import { ButtonSize, ButtonType } from 'models';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    variant?: ButtonType;
    size?: ButtonSize;
    to?: string;
    handleButtonClick?: VoidFunction;
    additionalClasses?: string;
}

export const Button: React.FC<Props> = ({
    variant,
    size,
    to,
    additionalClasses,
    handleButtonClick,
    children,
}) => {
    return to ? (
        <Link
            className={`btn ${buttonType()} ${buttonSize()} ${additionalClasses}`}
            to={to}
        >
            {children}
        </Link>
    ) : (
        <button
            onClick={handleButtonClick}
            className={`btn ${buttonType()} ${buttonSize()} ${additionalClasses}`}
        >
            {children}
        </button>
    );

    function buttonType() {
        switch (variant) {
            case ButtonType.Primary:
                return 'btn--primary';
            case ButtonType.Secondary:
                return 'btn--secondary';
            case ButtonType.Back:
                return 'btn--back';
            case ButtonType.Header:
                return 'btn--header';
            default:
                return;
        }
    }

    function buttonSize() {
        switch (size) {
            case ButtonSize.Small:
                return 'btn--size-sml';
            case ButtonSize.Medium:
                return 'btn--size-med';
            case ButtonSize.Large:
                return 'btn--size-lrg';
            default:
                return;
        }
    }
};
