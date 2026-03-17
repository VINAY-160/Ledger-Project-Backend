const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({

    // Reference to the user who owns the account
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Account must be associated with user"],
        index: true
    },

    // Account status
    status: {
        type: String,
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status must be ACTIVE, FROZEN, or CLOSED"
        },
        default: "ACTIVE"
    },

    // Currency used in the account
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account"],
        default: "INR"
    }

}, {
    timestamps: true
});

// Compound index for faster queries
accountSchema.index({ user: 1, status: 1 });

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;