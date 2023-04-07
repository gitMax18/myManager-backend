import bcrypt from "bcrypt";

export default async function (clearPassword: string) {
    return await bcrypt.hash(clearPassword, 10);
}
