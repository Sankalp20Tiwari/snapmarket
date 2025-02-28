import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import nodemailer from "nodemailer"

export async function POST(req:NextRequest) {

    try {
        const body = await req.text()

        const signature = req.headers.get("X-razorpay-signature")

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest("hex")

        if (signature !== expectedSignature) {
            return NextResponse.json("Invalid signature", { status: 400 })   
        }

        const event = JSON.parse(body)

        await connectToDatabase()

        if(event.event = "payment.captured"){
            const payment = event.payload.payment.entity;

            const order = await Order.findOneAndUpdate(
                {razorpayOrderId: payment.order_id},
                {
                    razorpayPaymentId: payment.id,
                    status: "completed",
                }
            ).populate([
                {path: "productId", select : "name"},
                {path: "userId", select : "email"},
            ])

            if(order){
                const transporter = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: process.env.MAILTRAP_USER,
                      pass: process.env.MAILTRAP_PASS,
                    },
                  });

                  await transporter.sendMail({
                    from: '"SnapMarket" <noreply@snapmarket.com>',
                    to: order.userId.email,
                    subject: "Payment Confirmation - SnapMarket",
                    text: `
                        Thank you for your purchase!
                        
                        Order Details:
                        - Order ID: ${order._id.toString().slice(-6)}
                        - Product: ${order.productId.name}
                        - Version: ${order.variant.type}
                        - License: ${order.variant.license}
                        - Price: $${order.amount.toFixed(2)}
                        
                        Your image is now available in your orders page.
                        Thank you for shopping with ImageKit Shop!
                                    `.trim(),
                    });
            }

        }

        return NextResponse.json({message: "Success"}, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Something went wrong"}, { status: 500 })
    }
}