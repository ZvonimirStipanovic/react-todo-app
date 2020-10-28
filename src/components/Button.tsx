import { ButtonSize, ButtonType } from 'models';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    variant?: ButtonType;
    size?: ButtonSize;
    to?: string;
    handleButtonClick?: (event: any) => void;
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
            className={`btn ${buttonType()} ${buttonSize()} s-top--sml s-right--sml s-left--sml${additionalClasses}`}
            to={to}
        >
            {children}
        </Link>
    ) : (
        <button
            onClick={handleButtonClick}
            className={`btn ${buttonType()} ${buttonSize()} s-top--sml s-right--sml s-left--sml ${additionalClasses}`}
        >
            {children}
        </button>
    );

    function buttonType() {
        switch (variant) {
            case ButtonType.Primary:
                return 'btn--primary t-bg-primary';
            case ButtonType.Secondary:
                return 'btn--secondary t-bg-secondary';
            case ButtonType.Neutral:
                return 'btn--neutral t-bg-neutral';
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
