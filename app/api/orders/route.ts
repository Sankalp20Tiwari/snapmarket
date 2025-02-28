import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay  = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if(!session){
            return NextResponse.json({error: "Unauthorized access"},{status: 401})
        }

        const {productId, variant  } = await request.json()

        if(!productId || !variant){
            return NextResponse.json({error: "Product id and variant required"},{status: 400})
        }

        await connectToDatabase()

        //create razorpay order

        const order = await razorpay.orders.create({
            amount: Math.round(variant.price * 100),
            currency: "INR",
            receipt: `receipt-${Date.now()}`,
            notes:{
                productId: productId.toString(),
                variant
            }

        })

        const newOrder = await Order.create({
            userId: session.user.id,
            productId,
            variant,
            razorpayOrderId: order.id,
            amount: Math.round(variant.price * 100),
            status: "pending"
        })

        return NextResponse.json({
            orderId : order.id,
            amount : order.amount,
            currency : order.currency,
            dbOrderId : newOrder._id,
        })
    } catch (error) {
        console.error(error)

        return NextResponse.json({error: "Failed to create order"},{status: 500})
    }
}