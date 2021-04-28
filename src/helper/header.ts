export const setHeader = (authToken: string) => {
    document.cookie = `authToken=${authToken}`;
};

export const getHeader = () => {
    return document.cookie.split("=")[1];
}

export const removeHeader = () => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}