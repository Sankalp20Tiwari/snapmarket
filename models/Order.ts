import mongoose, {Schema , models , model} from "mongoose";
import { ImageVariant , ImageVariantType } from "./Product";

interface PopulatedUser {
    _id: mongoose.Types.ObjectId,
    email: string
}

interface PopulatedProduct {
    _id: mongoose.Types.ObjectId,
    name: string,
    imageUrl: string
}

export interface IOrder{
    _id?: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId | PopulatedUser,
    productId: mongoose.Types.ObjectId | PopulatedProduct,
    variant : ImageVariant,
    razorpayOrderId?: string,
    razorpayPaymentId?: string,
    amount: number,
    status: "pending" | "completed" | "failed",
    downlaodUrl?: string,
    previewUrl?: string,
    createdAt?: Date,
    updatedAt?: Date
}


const orderSchema = new Schema <IOrder>({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    variant:{
    type:{
        type: String,
        required: true,
        enum: ["SQUARE","WIDE","PORTRAIT"] as ImageVariantType[]
    },
    price:{
        type: Number,
        required: true,
    },
    license:{
        type: String,
        required: true,
        enum: ["personal","commercial"],
    }    
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ["pending","completed","failed"],
        default: "pending"
    },
    downlaodUrl:{
        type: String,
    },
    previewUrl:{
        type: String
    }
},{timestamps: true})


const Order = models?.Order || model("Order",orderSchema)

export default Order