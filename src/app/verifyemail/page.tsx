"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      setError(true);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="container" style={{color:"black"}}>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Verify Email</h3>
              {/* <h2>{token ? `${token}` : "no token"}</h2> */}
            </div>
            

            {verified && (
              <div >
                <p>
                  You have successfully verified your account.
                </p>
                <Link href={"/login"}>Login</Link>
              </div>
            )}

            {error && (
              <div>
                <p>
                  Error
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
