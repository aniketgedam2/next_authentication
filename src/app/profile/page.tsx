"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
type userData = {
  email?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  username?: string;
  __v?: number;
  _id?: string;
};
export default function Profilepage() {
  const router = useRouter();
  const [data, setData] = useState<userData>({username:''});
  const Logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("User logged out");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getuserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data);
  };

  return (
    <div>
      <h1> Profile</h1>
      <p>This is the profile page</p>
      <h2>
        {data.username === "" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data._id}`}>{data._id}</Link>
        )}
      </h2>
      {/* {data ===null ? "nothing" :( <link href={`/profile/${data}`}>go</link>)} */}
      <div>
        <button onClick={Logout}>Logout</button>
      </div>
      <div>
        <button onClick={getuserDetails}>get userdata</button>
      </div>
    </div>
  );
}
