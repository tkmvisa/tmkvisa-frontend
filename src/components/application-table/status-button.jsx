"use state"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { renderStatusChip } from './application-table';
import { Alert, Box, Modal, Snackbar } from '@mui/material';
import Image from 'next/image';
import { SendEmail } from "@/utils/SendEmail";
import { useToast } from '@/hooks/useToast';
import axios from 'axios';
import { formatDate } from '@/utils/utils';

export default function StatusButton({ status, id }) {
    const [openModel, setOpen] = React.useState(false);
    const handleOpenInviatationModel = () => setOpen(true);
    const handleCloseModel = () => setOpen(false);
    const [openModelForAppoinment, setOpenModelForAppoinment] = React.useState(false);
    const handleOpenAppoinmentModel = () => setOpenModelForAppoinment(true);
    const handleCloseModelAppoinment = () => setOpenModelForAppoinment(false);
    const [applicaionStatus, setApplicationStatus] = React.useState('')
    const [appoinmentDate, setAppoinmentDate] = React.useState('')
    const [uploading, setUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [invitationFile, setInvitationFile] = React.useState(null);
    const [uploadSuccess, setUploadSuccess] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [_id, setId] = React.useState()

    const { toast, showToast, closeToast } = useToast();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateStatus = async (status, id) => {
        setApplicationStatus(status)
        setId(id)
        switch (status) {
            case "Invitation received":
                handleOpenInviatationModel()
                break;

            case "Appointment scheduled":
                handleOpenAppoinmentModel()
                break;

            default:
                updateStatus(status, id)
                break;
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",
        bgcolor: '#fff',
        boxShadow: 24,
        maxWidth: "442px",
        borderRadius: "12px",
        padding: "28px",
    };

    const updateStatus = async (status, id) => {
        try {
            handleClose()
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${id}`,
                status === "Appointment scheduled" ? {
                    "data": {
                        "Application_Status": `${status}`,
                        "Appoinment_schedule_file": invitationFile?.id,
                        "Appoinment_Date": appoinmentDate || ""
                    }
                } : {
                    "data": {
                        "Application_Status": `${status}`,
                        "Invitation_File": invitationFile?.id,
                    }
                }
            );
            showToast("Status Updated", "success");
            const res = data?.data?.attributes
            if(data?.data?.id){
                if(status === "Invitation received"){
                    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${id}`,
                        {
                            "data": {
                                "InvitationDate": await formatDate()
                            }
                        }
                    );
                }
                if(status === "Appointment scheduled"){
                    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${id}`,
                        {
                            "data": {
                                "AppoinmentScheduleDate": await formatDate()
                            }
                        }
                    );
                }
            }            
            const d = {...res, file: invitationFile?.url}
            if (status === "Invitation received") {
                SendEmail({ res: d, showToast, status: "invitation" })
                handleCloseModel()
            }
            if (status === "Appointment scheduled") {
                SendEmail({ res: data?.data?.attributes, showToast, status: "appointment-scheduled" })
                handleCloseModelAppoinment()
            }
            if (status === "Awaiting") {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${id}`,
                    {
                        "data": {
                            "AwaitingDate": await formatDate()
                        }
                    }
                );
            }
            
            if (status === "Awaiting for an appointment") {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${id}`,
                    {
                        "data": {
                            "AwatingForAppoinmentDate": await formatDate()
                        }
                    }
                );
            }
            if (status === "Approved") {
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${id}`,
                    {
                        "data": {
                            "ApprovedDate": await formatDate()
                        }
                    }
                );
            }


            location.reload();
        } catch (error) {
            showToast("Status Updated Failed!", "error");
        }
    }




    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setInvitationFile(file);
            uploadFile(file);
        }
    };

    const onDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setInvitationFile(file);
            uploadFile(file);
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        try {
            setUploading(true);
            setError(null);
            setUploadProgress(0);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(progress); // Update progress state
                    },
                }
            );

            const uploadedFile = response.data[0];
            setUploadSuccess(true);
            setInvitationFile(uploadedFile);
        } catch (error) {
            setError('Failed to upload file. Please try again.');
            console.error('Error uploading file:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className='!p-0'
                >
                    {renderStatusChip(status)}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}

                >
                    <MenuItem onClick={() => handleUpdateStatus("Created", id)} className='!text-sm !px-5 !py-[3px]'>Created</MenuItem>
                    <MenuItem onClick={() => handleUpdateStatus("Awaiting", id)} className='!text-sm !px-5 !py-[3px]'>Awaiting</MenuItem>
                    <MenuItem onClick={() => handleUpdateStatus("Invitation received", id)} className='!text-sm !px-5 !py-[3px]'>Invitation received</MenuItem>
                    <MenuItem onClick={() => handleUpdateStatus("Awaiting for an appointment", id)} className='!text-sm !px-5 !py-[3px]'>Awaiting for an appointment</MenuItem>
                    <MenuItem onClick={() => handleUpdateStatus("Appointment scheduled", id)} className='!text-sm !px-5 !py-[3px]'>Appointment scheduled</MenuItem>
                    <MenuItem onClick={() => handleUpdateStatus("Approved", id)} className='!text-sm !px-5 !py-[3px]'>Approved</MenuItem>
                </Menu>
            </div>

            <Modal
                open={openModel}
                onClose={handleCloseModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="text-[#8E59FF] text-[15px] font-bold pb-[22px] border-b mb-3 border-[#EFEFEF]">
                        Status change: Invitation received
                    </div>
                    <div>
                        <div
                            onDrop={onDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className={`border-dashed border-2 p-6 rounded-md flex flex-col items-center justify-center ${uploading ? 'border-blue-500' : 'border-gray-300'}`}
                            style={{
                                height: '200px',
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
                            <p className="text-black font-medium mb-1 mt-5">
                                {uploading ? 'Uploading...' : 'Choose a file or drag & drop it here.'}
                            </p>
                            <p className="text-gray-400 text-sm">PDF format only, up to 50 MB.</p>
                            <button
                                className="mt-4 px-5 text-sm border text-gray-500 py-[6px] bg-transparent rounded-xl"
                                type="button"
                                onClick={() => document.querySelector('input[type="file"]').click()}
                            >
                                Browse File
                            </button>
                        </div>

                        {uploading && <UploadingFile file={invitationFile} uploadProgress={uploadProgress} />}

                        {uploadSuccess && <SuccessFile file={invitationFile} />}

                        {error && <p className="text-red-500">{error}</p>}
                    </div>


                    <div className="flex gap-5 mt-5 justify-center">
                        <button onClick={handleCloseModel} className="py-4 px-[53px] font-bold rounded-[10px] text-[#111827] border border-[#111827]">Cancel</button>
                        <button disabled={!uploadSuccess} onClick={() => updateStatus(applicaionStatus, _id)} className="py-4 px-[53px] font-bold rounded-[10px] bg-[#111827] text-white border border-[#111827]">Confirm</button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openModelForAppoinment}
                onClose={handleCloseModelAppoinment}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="text-[#8E59FF] text-[15px] font-bold pb-[22px] border-b mb-3 border-[#EFEFEF]">
                        Status change:Appointment scheduled
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-[#111827]">Appointment date and time</h4>
                        <div className="flex border border-[#E9EAEC] rounded-[10px] overflow-hidden p-2 px-4 my-3">
                            <input value={appoinmentDate} onChange={(e) => setAppoinmentDate(e.target.value)} placeholder="dd/mm/yyyy" className="border-none text-sm w-full p-2 focus:outline-none ring-0" />
                            <Image src="/calandar.svg" alt="" width={14} height={16} />
                        </div>
                    </div>
                    <div>
                        <div
                            onDrop={onDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className={`border-dashed border-2 p-6 rounded-md flex flex-col items-center justify-center ${uploading ? 'border-blue-500' : 'border-gray-300'}`}
                            style={{
                                height: '200px',
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
                            <p className="text-black font-medium mb-1 mt-5">
                                {uploading ? 'Uploading...' : 'Choose a file or drag & drop it here.'}
                            </p>
                            <p className="text-gray-400 text-sm">PDF format only, up to 50 MB.</p>
                            <button
                                className="mt-4 px-5 text-sm border text-gray-500 py-[6px] bg-transparent rounded-xl"
                                type="button"
                                onClick={() => document.querySelector('input[type="file"]').click()}
                            >
                                Browse File
                            </button>
                        </div>

                        {uploading && <UploadingFile file={invitationFile} uploadProgress={uploadProgress} />}

                        {uploadSuccess && <SuccessFile file={invitationFile} />}

                        {error && <p className="text-red-500">{error}</p>}
                    </div>


                    <div className="flex gap-5 mt-5 justify-center">
                        <button onClick={handleCloseModel} className="py-4 px-[53px] font-bold rounded-[10px] text-[#111827] border border-[#111827]">Cancel</button>
                        <button disabled={!uploadSuccess} onClick={() => updateStatus(applicaionStatus, _id)} className="py-4 px-[53px] font-bold rounded-[10px] bg-[#111827] text-white border border-[#111827]">Confirm</button>
                    </div>
                </Box>
            </Modal>
            <Snackbar
                open={toast.open}
                autoHideDuration={6000}
                onClose={closeToast}
            >
                <Alert onClose={closeToast} severity={toast.severity} sx={{ width: "100%" }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </>
    );
}



export const UploadingFile = ({ uploadProgress, file }) => {
    return (
        <div className="mt-3 border border-[#E2E4E9] rounded-[12px] p-4">
            <div className="flex items-center gap-3 ">
                <figure>
                    <Image src="/pdf.svg" alt="" width={40} height={40} />
                </figure>
                <div className="flex-1">
                    <div className="flex gap-3 justify-between w-full items-start">
                        <h6 className="text-[#0A0D14] font-medium text-sm">{file.name}</h6>
                        <Image src="/delete-bin.svg" alt="" width={20} height={20} />
                    </div>
                    <div className="flex items-center mt-1 gap-2.5">
                        <p className="text-[#525866] text-xs">{(file.size / 1024).toFixed(0)} KB of {(file.size / 1024).toFixed(0)} KB</p>
                        <div className="flex items-center gap-1">
                            <Image src="/loader.svg" alt="" width={20} height={20} />
                            <p className="text-[#0A0D14] text-xs">Uploading...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-2 items-center justify-between">
                <div
                    className="flex-1 bg-gray-200 rounded-full"
                    style={{ height: "6px" }}
                >
                    <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{
                            width: `${uploadProgress}%`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}


export const SuccessFile = ({ file }) => {
    return (
        <div className="flex items-center gap-3 mt-3 border border-[#E2E4E9] rounded-[12px] p-4">
            <figure>
                <Image src="/pdf.svg" alt="" width={40} height={40} />
            </figure>
            <div className="flex-1">
                <div className="flex gap-3 justify-between w-full items-start">
                    <h6 className="text-[#0A0D14] font-medium text-sm">{file.name}</h6>
                    <Image src="/delete-bin.svg" alt="" width={20} height={20} />
                </div>
                <div className="flex items-center mt-1 gap-2.5">
                    <p className="text-[#525866] text-xs">{(file.size / 1024).toFixed(0)} KB of {(file.size / 1024).toFixed(0)} KB</p>
                    <div className="flex items-center gap-1">
                        <Image src="/select-box-circle-fill.svg" alt="" width={20} height={20} />
                        <p className="text-[#0A0D14] text-xs">Completed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}