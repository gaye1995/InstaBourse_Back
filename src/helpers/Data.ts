import validator from 'validator';
import bcrypt from 'bcrypt';

export default class Datahelpers {
    static checkEmail(email: string): boolean {
        return validator.isEmail(email);
    }
    static checkPassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        if (password.trim().length > 8 || password.trim().length < 20) return false;
        else return regex.test(password);
    }
    
}
const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};
const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};
// const hashPassword = async (password, saltRounds = 10) => {
//     try {
//         // Generate a salt
//         const salt = await bcrypt.genSalt(saltRounds);

//         // Hash password
//         return await bcrypt.hash(password, salt);
//     } catch (error) {
//         console.log(error);
//     }

//     // Return null if error
//     return null;
// };
export { comparePassword, hashPassword }