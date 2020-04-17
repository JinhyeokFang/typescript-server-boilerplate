import { Document } from 'mongoose';

interface UserModelT extends Document {
    username: string;
    password: string;
};

export default UserModelT;