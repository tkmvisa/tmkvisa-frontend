import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const FileUpload = ({ setODocument }) => {
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);

    const onDrop = (e) => {
        e.preventDefault();
        const uploadedFiles = Array.from(e.dataTransfer.files);
        if (uploadedFiles.length > 0) {
            setFiles(uploadedFiles);
            handleFileUpload(uploadedFiles);
        }
    };

    const onFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles);
            handleFileUpload(selectedFiles);
        }
    };

    const handleFileUpload = async (files) => {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

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
            console.log('Files uploaded successfully:', response.data);
            setODocument(response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`border-dashed border-2 p-6 w-full md:w-[230px] rounded-md flex flex-col items-center justify-center ${uploading ? 'border-blue-500' : 'border-gray-300'}`}
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
                multiple
                className="hidden"
            />
            <Image src="/upload-cloud.svg" alt="Upload" width={24} height={24} />
            <p className="text-black font-medium mb-1 mt-1">
                {uploading ? 'Uploading...' : 'Add documents'}
            </p>
            <button
                className="mt-2 px-5 text-sm border text-gray-500 py-[6px] bg-transparent rounded-xl"
                type="button"
                onClick={() => document.querySelector('input[type="file"]').click()}
            >
                Browse Files
            </button>
        </div>
    );
};

export default FileUpload;
