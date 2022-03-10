import * as bcrypt from 'bcrypt';
import { async } from 'rxjs';
const saltRounds = 10

export class SecureInstance {
    static genSalt = async() => {
        return bcrypt.genSalt(saltRounds);
    }

    static hash = async(plainPassword, salt) => {
        return bcrypt.hash(plainPassword, salt);
    } 

    static compareSync = async(comparePassword, hashValue) => {
        return bcrypt.compareSync(comparePassword, hashValue)
    }
}