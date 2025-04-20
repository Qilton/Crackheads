const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define roles as a constant object for clarity
const rolesEnum = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    MEMBER: 'member'
};

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    pfp:{
        type: String,
        required: false,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    address: {
        type: String,
        required: false,
    },
    communities: [{
        communityId: {
            type: Schema.Types.ObjectId,
            ref: 'communities',
            required: true
        },
        role: {
            type: String,
            enum: Object.values(rolesEnum),
            default: rolesEnum.MEMBER
        }
    }]
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
