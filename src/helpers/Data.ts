import validator from 'validator';

export default class Datahelpers {
    static checkEmail(email: string): boolean {
        return validator.isEmail(email);
    }
    static checkPassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        if (password.trim().length < 8 || password.trim().length > 20) return false;
        else return regex.test(password);
    }
}