import { AuthService } from '../services';
import * as H from 'history';

export const useHandleRegister = (history: H.History) => (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    AuthService.register(email.value, password.value, history);
};
