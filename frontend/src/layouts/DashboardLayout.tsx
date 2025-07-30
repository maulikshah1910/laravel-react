'use client';

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { useEffect, useState } from "react";
import api from "../../lib/axios";


type userDetails = {
    name?: string;
    email?: string;
};

const DashboardLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    const [userDetails, setUserDetails] = useState<userDetails>({});
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            getUser();
        }
    }, []);

    const getUser = async () => {
        try {
            const res = await api.get('/me');

            const data = res.data.data;
            const name = data.name;
            const email = data.email;

            setUserDetails({
                name: name,
                email: email
            });
        } catch (error:any) {
            if (error.status && error.status == 403) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header user={userDetails} />
            
            <div className=" flex flex-1">
                <Sidebar />

                <main className="flex-1 bg-gray-200 p-6 overflow-auto text-black">
                    {children}
                </main>
            </div>
            
            <Footer />
        </div>
    )
};


export default DashboardLayout;