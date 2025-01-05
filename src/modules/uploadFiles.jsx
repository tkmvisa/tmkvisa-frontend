import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const FileUpload = ({setODocument}) => {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);

    const onDrop = (e) => {
        e.preventDefault();
        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            handleFileUpload(uploadedFile);
        }
    };

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            handleFileUpload(selectedFile);
        }
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        try {
            setUploading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('File uploaded successfully:', response.data);
            setODocument(response.data)
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`border-dashed border-2 p-6 max-w-[209px] rounded-md flex flex-col items-center justify-center ${uploading ? 'border-blue-500' : 'border-gray-300'}`}
            style={{
                height: '140px',
                textAlign: 'center',
                backgroundColor: uploading ? '#f0f9ff' : 'transparent',
            }}
        >
            <input
                type="file"
                onChange={onFileChange}
                accept="application/pdf"
                className="hidden"
            />
            <Image src="/upload-cloud.svg" alt="" width={24} height={24} />
            <p className="text-black font-medium mb-1 mt-1">
                {uploading ? 'Uploading...' : 'Add documents'}
            </p>
            <button
                className="mt-2 px-5 text-sm border text-gray-500 py-[6px] bg-transparent rounded-xl"
                type="button"
                onClick={() => document.querySelector('input[type="file"]').click()}
            >
                Browse File
            </button>
        </div>
    );
};

export default FileUpload;
