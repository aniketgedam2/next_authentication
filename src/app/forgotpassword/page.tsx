"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
  
    const [user, setUser] = useState({
        email: ""
      });

    const onForgot = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/forgotpassword", user);
          console.log("check your mail", response.data);
          router.push("/")
          toast.success("Check Your Email");
        } catch (error: any) {
          console.log("forgot password faild", error);
          toast.error(error);
        } finally {
          setLoading(false);
          setUser({
            email: ""
          });
        }
      };

  return (
    <>
    <div className="login">
        <div className="container">
          <h2>Forgot Password</h2>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser( {...user, email: e.target.value} )}
              placeholder="email"
              required
            />
            <button onClick={onForgot}>Submit</button>
        </div>
      </div>
    </>
  )
}
