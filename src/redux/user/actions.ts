export const SET_USER_ID = 'SET_USER_ID';

export const setUserId = (userId: string | undefined) => ({
    type: SET_USER_ID,
    userId,
});
