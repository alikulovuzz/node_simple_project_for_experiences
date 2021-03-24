import mongoose from "mongoose";

const QuarterSchema = new mongoose.Schema(
    {
        district_id: {
            type: Number,
            required: [true, "The region's name (uz) is required"],
            unique: true,
        },
        name: {
            type: String,
            required: [true, "The region's name (uz) is required"],
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);
const QuertertModel = mongoose.model('quarter', QuarterSchema);
export default QuertertModel;
