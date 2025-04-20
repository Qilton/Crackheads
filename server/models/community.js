const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define roles as a constant object for clarity
const rolesEnum = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    MEMBER: 'member'
};

const CommunitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    location: {
        lat: {
            type: Number,
            required: false,
        },
        lng: {
            type: Number,
            required: false,
        }
    },
    members: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        role: {
            type: String,
            enum: Object.values(rolesEnum),
            default: rolesEnum.MEMBER
        }
    }],
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }],
    joinCodes:[{
        type:[String],
        required:false,
        default:[]
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});



const CommunityModel = mongoose.model('communities', CommunitySchema);
module.exports = CommunityModel;
