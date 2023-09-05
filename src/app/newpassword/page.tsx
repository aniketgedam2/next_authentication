"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

export default function NewPassword() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
  
    const [user, setUser] = useState({
        password : "",
        confirmPassword : "",
        token : "",
    })
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setUser( {...user , token : urlToken } || "");
      }, []);

    const onSubmitPassword = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/resetpassword", user);
          console.log("Password reset successfull", response.data);
          router.push("/login");
        } catch (error: any) {
          console.log("reset password faild", error);
          toast.error(error);
        } finally {
          setLoading(false);
        }
      };

  return (
    <>
    <div className="login">
        <div className="container">
          <h2>Reset Password</h2>
            <input
              type="text"
              id="password"
              value={user.password}
              onChange={(e) => setUser( {...user , password : e.target.value })}
              placeholder="password"
              required
            />
            <input
              type="text"
              id="confirmpassword"
              value={user.confirmPassword}
              onChange={(e) => setUser( {...user , confirmPassword : e.target.value })}
              placeholder="Confirm Password"
              required
            />
            <button onClick={onSubmitPassword}>Submit</button>
        </div>
      </div>
    </>
  )
}
