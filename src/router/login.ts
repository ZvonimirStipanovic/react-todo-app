export const LOGIN_TOKEN: string = 'logintoken';

export const login = (token: string) => {
    localStorage.setItem(LOGIN_TOKEN, token);
};
export const logout = () => {
    localStorage.removeItem(LOGIN_TOKEN);
};

export const isLoggedIn = () =>
    localStorage.getItem(LOGIN_TOKEN) ? true : false;

export const getLoginToken = () => localStorage.getItem(LOGIN_TOKEN);
