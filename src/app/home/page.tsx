"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Link from 'next/link';

function page() {
    const [userData, setUserData] = useState({
        _id: "", username: "", email: ""
    });
    const router = useRouter();

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/home");
            setUserData({ ...response.data.data });
        } catch (error: any) {
            toast(error.message);
        }
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("You are logged out successfully...");
            router.push("/login");
        } catch (error: any) {
            toast(error.message);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);


    return (
        <div className='w-full text-center flex flex-col gap-3 mt-[20%]'>
            <div className='w-full'>
                <h1 className='text-[1.5rem] lg:text-[1.8rem] font-semibold'> Hii <span className='uppercase text-red-600'>{userData.username}</span>, Please Click Below The Link To See Your Profile</h1>
                <Link href={`/home/${userData._id}`} className='text-[1.2rem] lg:text-[1.5rem]'>CLICK ME</Link>
            </div>
            <button onClick={logout} className="bg-blue-900 duration-300 hover:bg-blue-800 hover:duration-300 w-[50%] mx-auto mt-4 p-3 rounded-lg">LOGOUT</button>
        </div>
    )
}

export default page
