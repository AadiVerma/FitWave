import mongoose from 'mongoose';

const purchaseSchema = mongoose.Schema({
    product: {
        name: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchasedAt: {
        type: Date,
        default: Date.now
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;
