import Cookies from 'js-cookie';
export const getTokenFromCookies = () => {
    const cookies = Cookies.get("JWTTOKEN");
    if (cookies) {
        return true;
    }
    return false;
};