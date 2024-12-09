"use client"
import React, { useState } from "react";
import axios from "axios";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  // Handle file selection
  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
  };

  // Upload file to Strapi
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("files", file); // 'files' is the key expected by Strapi

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedFile = response.data[0]; // Strapi returns an array
      setUploadedFileUrl(uploadedFile.url);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} style={{ display: "block", margin: "20px auto" }} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          backgroundColor: uploading ? "#ccc" : "#007BFF",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedFileUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>File uploaded to:</p>
          <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
            {uploadedFileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
