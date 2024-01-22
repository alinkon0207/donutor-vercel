export const truncate = (str: string) => {
    const firstPart = str?.slice(0, 6);
    const lastPart = str?.slice(str.length - 4, str.length);
    return firstPart + '...' + lastPart;
}
