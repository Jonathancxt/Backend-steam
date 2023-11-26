
const bcrypt = require('bcrypt');

/*
 * Generate a hashed password based on the HS256 algorithmn, note that the same password may generate a different hash
 * each time due to the a variable salt added to each generate. Please only use bcrypt compare to check the password
 * */
export const genHashPassword = async (password: string): Promise<string> => {
    console.log(password)
    return await bcrypt.hash(password, 10);
};

/*
 * Note that for bcrypt.compare to work, it has to accept the plain text as the first param
 * and hashedPassword as the second, exclusively in that order to work
 * */
export const validatePassword = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};


module.exports = {genHashPassword, validatePassword};
