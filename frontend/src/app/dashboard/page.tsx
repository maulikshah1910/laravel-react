'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    });

    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
};


export default Dashboard;