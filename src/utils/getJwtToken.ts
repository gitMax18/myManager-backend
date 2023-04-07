import jwt from "jsonwebtoken";

export default (userId: number) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
    });
};
