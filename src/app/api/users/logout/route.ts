import { NextResponse } from "next/server"


export async function GET(){
    try {
        const response = NextResponse.json({
            message:"Loged out successfully",
            success: true,
        })

        response.cookies.set("token", "",
        {
            expires: new Date(0),
            httpOnly: true,
        });

        return response;
        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},
        {status:500})
    }
}