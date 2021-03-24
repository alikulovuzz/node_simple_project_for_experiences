import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema(
    {
        name_uz: {
            type: String,
            required: [true, "The region's name (uz) is required"],
            unique: true,
        },
        name_oz: {
            type: String,
            required: [true, "The region's name (oz) is required"],
            unique: true,
        },
        name_ru: {
            type: String,
            required: [true, "The region's name (ru) is required"],
            unique: true,
        },
        added_by: {
            type: String,
            required: [true, "The Author's name is required"],
            //unique: true,
        },
        is_approved: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);
const RegionModel = mongoose.model('Region', RegionSchema);
export default RegionModel;
