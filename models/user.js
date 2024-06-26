import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'Alphanumeric Characters only']
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    associates:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        if (this.password) { // Only hash if password is provided
            const saltRounds = 10; // the amount hash rounds 
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = models.User || model('User', userSchema);

export default User;
