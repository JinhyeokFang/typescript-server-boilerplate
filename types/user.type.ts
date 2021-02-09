import { Document } from 'mongoose';

export default interface UserModelT extends Document {
    username: string;
    password: string;
};