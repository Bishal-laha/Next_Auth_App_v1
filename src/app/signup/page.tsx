"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";


function page() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [disabledButton, setDisabledButton] = useState(true);
    const route = useRouter();

    const submitDetails = async (e: any) => {
        try {
            e.preventDefault();
            const response = await axios.post("/api/users/signup", userDetails);
            console.log(response);
            if (response.status === 200)
                route.push("/login");
            else
                toast(response.data.error);

        } catch (error: any) {
            toast(error.message);
        }
    }

    useEffect(() => {
        if (userDetails.username.length > 0 && userDetails.email.length > 0 && userDetails.password.length > 0)
            setDisabledButton(false);
        else
            setDisabledButton(true);
    }, [userDetails]);

    return (
        <div className='mx-auto max-w-[90%] lg:max-w-[30%] p-6 lg:p-8 bg-zinc-200/50 rounded-3xl mt-[30%] lg:mt-[10%]'>
            <h1 className='text-transparent text-[1.8rem] lg:text-[2rem] font-bold text-center bg-clip-text bg-gradient-to-br from-blue-950 to-slate-900'>SIGN-UP FORM</h1>
            <form className='mt-5 w-full' onSubmit={submitDetails}>
                <div className='flex flex-col gap-2 mt-4'>
                    <label className='text-white '>Enter Your UserName: </label>
                    <input type="text" name="username" id="username" value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} placeholder='Enter Your UserName' className='p-3 rounded-lg text-black' />
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                    <label className='text-white '>Enter Your Email Address: </label>
                    <input type="text" name="email" id="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} placeholder='Enter Your Email' className='p-3 rounded-lg text-black' />
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                    <label className='text-white '>Enter Your Password: </label>
                    <input type="text" name="password" id="password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} placeholder='Enter Your Password' className='p-3 rounded-lg text-black' />
                </div>
                <button type="submit" disabled={disabledButton} className="bg-blue-900 duration-300 hover:bg-blue-800 hover:duration-300 w-full mt-4 p-3 rounded-lg">Submit Details</button>
                <Link href="/login"><p className="text-[1rem] text-right mt-3 underline">Go To Login</p></Link >
            </form>
        </div>
    )
}

export default page
