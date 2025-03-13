import mongoose from 'mongoose';

const userInteractions = mongoose.Schema({
    userInteractions: {
        type: Number,
        default: 0
    },
});

const UserInteract = mongoose.model('UserInteraction', userInteractions);
export default UserInteract;
