import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET as string;

export default secret;
