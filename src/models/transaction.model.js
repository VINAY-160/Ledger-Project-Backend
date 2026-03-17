const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must have a source account"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must have a destination account"],
        index: true
    },
    status: {
        type: String,
        enum: {
            values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
            message: "Status must be PENDING, COMPLETED,FAILED or REVERSED"
        },
        default: "PENDING"
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for a transaction"],
        min: [0.01, "Transaction amount must be at least 0.01"]
    },
    idempotencyKey: {
        type: String,
        required: [true, "Idenpotency key is required for a transaction"],
        unique: true,
        index: true
    }
},
    {
        timestamps: true
    })  

transactionSchema.index({ fromAccount: 1 });

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;