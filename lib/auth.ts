import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db";
import User from "@/models/User";

export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",

            credentials:{
                email: {label: "email", type: "email"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email and password required")
                }

                try {
                    await connectToDatabase()

                    const user = await User.findOne({email: credentials.email})

                    if(!user){
                        throw new Error("No user found with this email")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(!isPasswordCorrect){
                        throw new Error("Incorrect password")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role
                    }
                } catch (error) {
                    console.log("Auth error", error)
                    throw error
                }

            }
        })
    ],

    callbacks:{
        async session({session,token}){
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            return session
        },
        async jwt({token,user}){
            if(user){
                token.id = user.id;
                token.role = user.role
            }
            return token
        }
    },

    pages:{
        signIn: "/login",
        error: "/login"
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },

    secret: process.env.NEXTAUTH_SECRET
}