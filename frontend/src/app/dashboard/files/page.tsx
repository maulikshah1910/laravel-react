'use client';

import Link from "next/link";
import { useEffect, useRef } from "react";
import { DataTable } from "simple-datatables";

const tableData = [
    {
        id: 1,
        name: "example.txt",
        size: "15 KB",
        type: "text/plain",
        extension: "txt",
        downloadLink: "/dashboard/files/download/example.txt"
    },
    {
        id: 2,
        name: "example2.txt",
        size: "20 KB",
        type: "text/plain",
        extension: "txt",
        downloadLink: "/dashboard/files/download/example2.txt"
    },
    {
        id: 3,
        name: "example3.pdf",
        size: "250 KB",
        type: "application/pdf",
        extension: "pdf",
        downloadLink: "/dashboard/files/download/example3.pdf"
    },
    {
        id: 4,
        name: "example4.jpg",
        size: "500 KB",
        type: "image/jpeg",
        extension: "jpg",
        downloadLink: "/dashboard/files/download/example4.jpg"
    }
];

const Files = () => {

    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        if (tableRef.current) {
            new DataTable(tableRef.current, {
                searchable: true,
                sortable: true,
                perPage: 1,
            });
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-transparent ">
            <div className="flex flex-row justify-between  gap-20 ">
                <h1 className="text-2xl font-bold mb-4">Files</h1>

                <div className="text-right">
                    <Link href="/dashboard" className="px-2 text-blue-500 hover:underline">
                        Dashboard
                    </Link> /
                    <span className="px-2">Files</span>
                </div>
            </div>
            
            <div className="flex-grow flex items-start justify-center mt-2">
                <table ref={tableRef} className=" table-fixed w-full border-1">
                    <thead>
                        <tr className="bg-gray-600 text-white borter-b">
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">File Name</th>
                            <th className="px-4 py-2 text-left">Size</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((file) => (
                            <tr key={file.id} className="border-b">
                                <td className="px-4 py-2">{file.id}</td>
                                <td className="px-4 py-2">{file.name}</td>
                                <td className="px-4 py-2">{file.size}</td>
                                <td className="px-4 py-2">
                                    <a href={file.downloadLink} className="text-blue-500 hover:underline">Download</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Files;