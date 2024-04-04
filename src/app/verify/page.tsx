"use client"

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react"

function page() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    // const router = useRouter();

    const verifyToken = async () => {
        try {
            await axios.post("/api/users/verify", { token });
            setVerified(true);
            setError(false);
        } catch (error: any) {
            setError(true);
        }
    }

    useEffect(() => {
        // const {query} = router;
        // const urlToken = query.token;
        // setToken(urlToken || "");
        setError(false);
        const token1 = window.location.search.split("=")[1];
        setToken(token1 || "");
    }, []);

    useEffect(() => {
        setError(false);
        if (token.length > 0) {
            verifyToken();
        }
    }, [token]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 rounded-lg mt-6 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}

export default page
