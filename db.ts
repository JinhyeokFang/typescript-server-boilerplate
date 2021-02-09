import mongoose from 'mongoose';

class DB {
    public initialize(name: string): void {
        mongoose.connect(`mongodb://localhost/${name}`, {
            useNewUrlParser: true
        })
    }
}

export default new DB();