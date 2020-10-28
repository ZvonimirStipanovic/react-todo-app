import React, { useState } from 'react';
import { BackButton } from './BackButton';
import { Button } from './Button';
import { ButtonSize, ButtonType } from 'models';
import * as H from 'history';
import { LoginModal, logout } from 'modules/authentication';
import { AppRoute } from 'const';
import { useAuthHook } from 'modules/authentication/hooks';

interface HeaderProps {
    title: string;
    showBackButton: boolean;
    showRightButtons: boolean;

    to?: string;
    history?: H.History;
}

export const Header = ({
    title,
    to,
    showBackButton,
    showRightButtons,
    history,
}: HeaderProps) => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

    const { isAnonymous } = useAuthHook(false);

    const loginButtons = () => {
        if (isAnonymous) {
            return (
                <div>
                    <Button
                        size={ButtonSize.Medium}
                        variant={ButtonType.Primary}
                        additionalClasses="btn--elipsoid"
                        handleButtonClick={() => setShowLoginModal(true)}
                    >
                        Log In
                    </Button>
                    <Button
                        size={ButtonSize.Medium}
                        variant={ButtonType.Primary}
                        additionalClasses="btn--elipsoid"
                        handleButtonClick={() => setShowRegisterModal(true)}
                    >
                        Register
                    </Button>
                </div>
            );
        } else {
            return (
                <Button
                    size={ButtonSize.Medium}
                    variant={ButtonType.Primary}
                    additionalClasses="btn--elipsoid"
                    handleButtonClick={() => handleLogout()}
                >
                    Log out
                </Button>
            );
        }
    };

    return (
        <header className="header t-bg-primary">
            <div className="wrapper">
                {showBackButton && to ? <BackButton to={to} /> : <div />}
                <div className="title-wrapper">
                    <p className="title title--header-size t-light">{title}</p>
                </div>
                {showRightButtons ? (
                    <div className="header--button-wrapper">
                        {loginButtons()}
                    </div>
                ) : (
                    <div />
                )}
            </div>
            <LoginModal
                open={showLoginModal}
                buttonTitle="Log in"
                title="Log in"
                type="login"
                history={history}
                setOpenLogin={setShowLoginModal}
            />
            <LoginModal
                open={showRegisterModal}
                buttonTitle="Register"
                title="Register"
                type="register"
                history={history}
                setOpenLogin={setShowRegisterModal}
            />
        </header>
    );

    function handleLogout() {
        logout();
        history!.push(AppRoute.Login);
    }
};
