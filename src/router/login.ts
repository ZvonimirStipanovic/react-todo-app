const GUEST_TOKEN: string = 'guesttoken';
export const LOGIN_TOKEN: string = 'logintoken';

export const login = (token: string) => {
    localStorage.setItem(LOGIN_TOKEN, token);
    localStorage.setItem(GUEST_TOKEN, token);
};
export const logout = () => {
    localStorage.removeItem(LOGIN_TOKEN);
    localStorage.removeItem(GUEST_TOKEN);
};
export const guestLogin = () => {
    localStorage.setItem(GUEST_TOKEN, 'guest');
};
export const isLoggedIn = () =>
    localStorage.getItem(LOGIN_TOKEN) ? true : false;
export const isGuest = () => (localStorage.getItem(GUEST_TOKEN) ? true : false);
export const getToken = (token: string) => localStorage.getItem(token);
