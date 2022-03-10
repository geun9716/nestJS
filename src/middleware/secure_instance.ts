import * as bcrypt from 'bcrypt';
const saltRounds = 10

export class SecureInstance {
    static genSalt = async() => {
        return bcrypt.genSalt(saltRounds);
    }

    static hash = async(plainPassword, salt) => {
        return bcrypt.hash(plainPassword, salt);
    } 
}