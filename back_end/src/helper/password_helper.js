// library function
import bcrypt from "bcryptjs";

export const encryptPassword = (value) => {
    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(value, salt);

    return password;
}

export const decryptPassword = (value, hash) => {
    let decPassword = bcrypt.compareSync(value, hash);
    return decPassword;
}