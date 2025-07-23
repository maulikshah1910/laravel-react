'use client';

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

const DashboardLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
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