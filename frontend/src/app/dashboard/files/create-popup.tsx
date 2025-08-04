'use client';

import Modal from "@/components/common/modal";
import { useState } from "react";

const CreateFilePopup = ({
    isOpen,
    handleOpenModal,
    handleCloseModal,
}: {
    isOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}) => {
    const [title, setTitle] = useState<string>("");
    
    const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal} title="Add New File">
            <form className="" onSubmit={handleFormSubmission}>
                <div className="mb-4">
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
            </form>
        </Modal>
    )
};

export default CreateFilePopup;