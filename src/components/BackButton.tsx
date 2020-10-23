import { ButtonSize, ButtonType } from 'models';
import React from 'react';
import { ReactComponent as Left } from 'assets/ui-icons/left.svg';
import { Button } from './Button';

interface Props {
    to: string;
}

export const BackButton: React.FC<Props> = ({ to }) => {
    return (
        <Button
            size={ButtonSize.Medium}
            variant={ButtonType.PrimaryOutline}
            to={to}
        >
            <Left>Back</Left>
        </Button>
    );
};
