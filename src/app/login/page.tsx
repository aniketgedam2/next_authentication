"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div className="login">
        <div className="login__main">
          <h1>{loading ? "Processing.." : "login"}</h1>
          <div>
            <label htmlFor="email"> Email</label>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
          </div>
          <div>
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
          </div>
          <button onClick={onLogin}>login</button>
          <Link href="/signup">Go to sign up</Link>
        </div>
      </div> */}
      <div className="login">
        <div className="container">
          <h2>Login</h2>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
              required
            />
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
              required
            />
            <button onClick={onLogin}>Login</button>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </>
  );
}
