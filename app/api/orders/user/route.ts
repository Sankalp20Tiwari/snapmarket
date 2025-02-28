import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const  session = await getServerSession(authOptions)

        if(!session){
            return NextResponse.json({error: "Unauthorized access"},{status: 401})
        }

        await connectToDatabase()

        const userOrders = await Order.find({user: session.user.id}).populate({
            path: "productId",
            select: "name imageUrl",
            options: { strictPopulate: false }
        })
        .sort({createdAt: -1})
        .lean()

        if(!userOrders || userOrders.length === 0){
            return NextResponse.json({error: "No orders found"},{status: 404})
        }

        return NextResponse.json({userOrders},{status: 200})

    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Something went wrong"},{status: 500})
    }
}