import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    console.log("aniket");

  try {
    const reqBody = await request.json();
        const { email} = reqBody;
        console.log(reqBody)

    const user = await User.findOne({ email });
    console.log("user:",user)

    if (user) {
        await sendEmail({email,emailType:"RESET",userId:user._id})
        return NextResponse.json({
            message: "Success",
            status :200
        })
      
    }else{
        return NextResponse.json({ 
            status: 400,
            message: "User not found"
        })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
