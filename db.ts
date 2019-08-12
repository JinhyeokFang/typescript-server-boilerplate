import mongoose from 'mongoose';

class db {
    constructor() {
        
    }
    public initialize(): void {
        mongoose.connect(`mongodb://localhost/db`, {
            useNewUrlParser: true
        })
    }
}

export default new db();