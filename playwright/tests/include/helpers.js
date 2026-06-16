/**
 * Generate a random alphanumeric string
 * @param {number} length
 * @returns {string}
 */
export function uniqid( length = 5 ) {
    let result = "";
    let counter = 0;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    while ( counter < length ) {
        result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
        counter += 1;
    }
    return result;
}
