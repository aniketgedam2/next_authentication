"use client";
import Link from "next/link";
import { NextRequest } from "next/server";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  const getToken = () =>{
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }
  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <div className="header">
        <nav className="header__nav">
          <div className="header__logo">
            <Link href="/">
              <h3>AG Web</h3>
            </Link>
          </div>

          <div className="header__navigation">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              {isLogin ? (
                <>
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link href="/logout">Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/signup">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
