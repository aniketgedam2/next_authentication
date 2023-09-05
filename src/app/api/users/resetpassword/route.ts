import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password, confirmpassword } = reqBody;
    console.log("reset password mail token  -- > ", reqBody);

    const user = await User.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });
    console.log(user);
    if (!user && password !== confirmpassword) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    } else {
      // hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      console.log("hashed password :", hashedPassword);

      await User.findByIdAndUpdate(user._id, {
        password: hashedPassword,
        forgetPasswordToken: undefined,
        forgetPasswordTokenExpiry: undefined,
      });

      return NextResponse.json({
        message: "password reset successfully",
        success: true,
      });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
