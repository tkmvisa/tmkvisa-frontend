"use client"
import React, { useState } from 'react'
import Label from "@/components/ui/label";
import { Alert, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { useToast } from '@/hooks/useToast';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { SendEmail } from '@/utils/SendEmail'
import { visaTypes } from '@/utils/visa-types';
import { countries } from '@/utils/country-list';
import StatusButton from '@/components/application-table/status-button';
import FileUpload from "./uploadFiles"
import Link from 'next/link';
import Image from 'next/image';

const EditApplicationModule = ({ documentRes }) => {
    const { id, attributes } = documentRes;
    console.log("🚀 ~ EditApplicationModule ~ documentRes:", documentRes)

    const [visaType, setVisType] = useState(attributes?.Visa_Type)
    const [visaType2, setVisType2] = useState(attributes?.Visa_Sub_Type)
    const [countery, setCountry] = useState(attributes?.country)
    const [fname, setFName] = useState(attributes?.firstName)
    const [lname, setLName] = useState(attributes?.lastName)
    const [phone, setPhone] = useState(attributes?.phoneNumber)
    const [email, setEmail] = useState(attributes?.email)
    const [nationality, setNationality] = useState(attributes?.Nationality)
    const [pNumber, setPNumber] = useState(attributes?.Passport_No)
    const [pValidityDate, setPValidityDate] = useState(attributes?.PassportValidity);
    const [residency, setResidency] = useState(attributes?.Residency);
    const [currentAddressState, setCurrentAddressState] = useState(false);
    const [installment, setInstallment] = useState(attributes?.Installment_plan);
    const [totalPayment, setTotalPayment] = useState(attributes?.Total_Payment);
    const [next, setNext] = useState(false);
    const [emailLang, setEmailLang] = useState('english');
    const [firstInstallment, setFirstInstallment] = useState(0);
    const [secoundInstallment, setSecoundInstallment] = useState(attributes?.Secound_Installment);
    const [thirdInstallment, setThirdInstallment] = useState(attributes?.Third_Installment);
    const [offficeLocation, setOfficeLocation] = useState(attributes?.Office_Location);
    const [currentApplicationStatus, setCurrentApplicationStatus] = useState(attributes?.Application_Status);
    const [odocument, setODocument] = useState()
    console.log("🚀 ~ EditApplicationModule ~ odocument:", odocument)

    // const randomID = useRandomID();
    // const token = Cookies.get('jwt');
    // const decodedData = jwt.decode(token);

    const [document, setDocument] = useState({
        passport: attributes?.Passport?.data?.id || 0,
        residenceID: attributes?.Residence_Id?.data?.id || 0,
        biometricPhoto: attributes?.Biomatric_Photo?.data?.id || 0,
        otherDocuments: attributes?.Other_Document?.data?.id || 0,
    });

    const [uploading, setUploading] = useState(false);

    const { toast, showToast, closeToast } = useToast(); // Initialize the toast hook
    const router = useRouter()

    const handleFileChange = async (event, fieldName) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast("File size exceeds 5MB!", "error");
                return;
            }
            if (file.type !== "application/pdf") {
                showToast("Only PDF files are allowed!", "error");
                return;
            }
        }

        const formData = new FormData();
        formData.append("files", file);

        try {
            setUploading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const uploadedFile = response.data[0];
            setDocument((prevState) => ({
                ...prevState,
                [fieldName]: uploadedFile, // Save uploaded file data
            }));
        } catch (error) {
            console.error("Error uploading file:", error);
            showToast("Failed to upload file. Please try again", "error");
        } finally {
            setUploading(false);
        }
    };

    const [address, setAddress] = useState({
        country: "",
        city: "",
        street: "",
        aptNo: "",
        zipcode: "",
    })
    const [currentAddress, setcurrentAddress] = useState({
        country: "",
        city: attributes?.Current_City,
        street: attributes?.Current_Street,
        aptNo: attributes?.Current_Apt,
        zipcode: attributes?.Current_zipcode,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeCurrent = (e) => {
        const { name, value } = e.target;
        setcurrentAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateApplication = async () => {
        let json = {
            "data": {
                "Visa_Type": visaType,
                "country": countery,
                "firstName": fname,
                "lastName": lname,
                "phoneNumber": phone,
                "email": email,
                "Nationality": nationality,
                "Passport_No": pNumber,
                "PassportValidity": pValidityDate,
                "Residency": residency,
                "home_country": address?.country,
                "home_city": address?.city,
                "home_street": address?.street,
                "Apt_no": address?.aptNo,
                "zipcode": address?.zipcode,
                "current_country": currentAddress?.country,
                "Current_City": currentAddress?.city,
                "Current_Street": currentAddress?.street,
                "Current_Apt": currentAddress?.aptNo,
                "Current_zipcode": currentAddress?.zipcode,
                "Installment_plan": installment,
                "Total_Payment": totalPayment,
                "First_Installment": `${firstInstallment}`,
                "Secound_Installment": `${secoundInstallment || 0}`,
                "Third_Installment": `${thirdInstallment || 0}`,
                "Email_Lang": emailLang,
                // "Application_Status": currentApplicationStatus,
                "Office_Location": offficeLocation,
            },
        }

        if (document?.passport) {
            json.data.Passport = document.passport;
        }
        if (document?.residenceID) {
            json.data.Residence_Id = document.residenceID;
        }
        if (document?.biometricPhoto) {
            json.data.Biomatric_Photo = document.biometricPhoto;
        }
        if (document?.otherDocuments) {
            json.data.Other_Document = document.otherDocuments;
        }


        const data = JSON.stringify(json)

        try {
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    const res = response?.data?.data?.attributes
                    if (attributes?.Application_Status !== res.Application_Status) {
                        if (res.Application_Status === "Invitation received") {
                            SendEmail({ res, showToast, status: "invitation" })
                        } if (res.Application_Status === "Appointment scheduled") {
                            SendEmail({ res, showToast, status: "appointment-scheduled" })
                        } else {
                            SendEmail({ res, showToast, status: "update" })
                        }
                    }
                    showToast("Application Updated", "success");
                })
                .catch((error) => {
                    showToast("Application Not Updated", "error");
                });

        } catch (error) {
            showToast("Application Not Created!", "error");
        }
    }


    const renderFileField = (label, fieldName) => (
        <div key={fieldName}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <label
                htmlFor={fieldName}
                className={`flex justify-between cursor-pointer items-center mt-2.5 bg-lite-gray pt-[16px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
            >
                {/* Left Text */}
                <span className="text-sm text-primary font-medium flex-grow">
                    {document[fieldName]?.name || `Upload ${label}`}
                </span>

                <FileIcon />

                <input
                    id={fieldName}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, fieldName)}
                    className="hidden"
                />
            </label>
            <p className="text-xs mt-1 text-[#687588]">Max file size: 5MB. File format: PDF</p>
        </div>
    );

    return (
        !next ?
            <>
                <div className="flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center mb-6">
                    <h4 className="font-bold text-xl md:text-2xl font_man text-main">Application</h4>
                    <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
                        <StatusButton status={attributes.Application_Status} id={id} />
                        <strong>Application number: {attributes?.ApplicationID}</strong>
                    </div>
                </div>
                <div className='!grid grid-cols-1 sm:grid-cols-2 md:!grid-cols-3 gap-x-4 md:gap-x-10 gap-y-3 md:!gap-y-6'>
                    <div className='flex flex-col'>
                        <Label>Visa Type</Label>
                        <Select
                            value={visaType}
                            onChange={(e) => setVisType(e.target.value)}
                            className="!text-sm flex-1 !font-medium !rounded-lg !mt-[10px] font_man !text-primary"
                            IconComponent={ArrowIcon}
                        >
                            {
                                visaTypes?.map((item, idx) => (
                                    <MenuItem value={item?.value} key={idx} className='!font-medium !text-sm'>{item?.type}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='flex flex-col'>
                        <Label>Country</Label>
                        <Select
                            value={countery}
                            onChange={(e) => setCountry(e.target.value)}
                            className="!text-sm flex-1 !font-medium !border-border !rounded-lg !mt-[10px] font_man !text-primary"
                            IconComponent={ArrowIcon}
                        >
                            {
                                countries?.map((item, idx) => (
                                    <MenuItem value={item?.value} className='!font-medium !text-sm' key={idx}>{item?.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='flex flex-col'>
                        <Label>Preferred Email language</Label>
                        <Select
                            value={emailLang}
                            onChange={(e) => setEmailLang(e.target.value)}
                            className="!text-sm flex-1 !font-medium !border-border !rounded-lg !mt-[10px] font_man !text-primary"
                            IconComponent={ArrowIcon}
                        >
                            <MenuItem value="turkmen" className='!font-medium !text-sm'>Turkish</MenuItem>
                            <MenuItem value="english" className='!font-medium !text-sm'>English</MenuItem>
                            <MenuItem value="russian" className='!font-medium !text-sm'>Russian</MenuItem>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-6 my-7">
                    <h4 className="font-bold text-xl md:text-2xl font_man text-main">Applicant details</h4>
                </div>

                <section className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-x-10 !gap-y-6'>
                    <div>
                        <Label>First Name</Label>
                        <div
                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                        >
                            <input
                                onChange={(e) => setFName(e.target.value)}
                                type="text"
                                value={fname}
                                placeholder="Atabay"
                                className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Last Name</Label>
                        <div
                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                        >
                            <input
                                onChange={(e) => setLName(e.target.value)}
                                type="text"
                                value={lname}
                                placeholder="Kuliyev"
                                className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <div
                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                        >
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                type="number"
                                value={phone}
                                placeholder="Enter phone number"
                                className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Email</Label>
                        <div
                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                        >
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                value={email}
                                placeholder="Enter email"
                                className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Nationality</Label>
                        <div
                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                        >
                            <input
                                onChange={(e) => setNationality(e.target.value)}
                                type="text"
                                value={nationality}
                                placeholder="Nationality"
                                className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Passport No</Label>
                        <div
                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                        >
                            <input
                                onChange={(e) => setPNumber(e.target.value)}
                                type="text"
                                value={pNumber}
                                placeholder="Passport Number"
                                className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Passport Validity</Label>
                        <div
                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pr-3 pl-4 pt-[15px] pb-[15px] rounded-[10px] border-[1px]`}
                        >
                            <TextField
                                type="text"
                                value={pValidityDate}
                                onChange={(e) => setPValidityDate(e.target.value)}
                                fullWidth
                                variant="outlined"
                                placeholder='dd/mm/yyyy'
                                IconComponent={ArrowIcon}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px', // Optional: customize border radius
                                        border: 'none',
                                        '& fieldset': {
                                            border: 'none', // Removes the default border
                                        },
                                        '&:hover fieldset': {
                                            border: 'none', // Removes border on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: 'none', // Removes border on focus
                                        },
                                    },
                                    '& input': {
                                        paddingLeft: '0',
                                        padding: '0'
                                    },
                                }}
                            />

                        </div>
                    </div>

                    <div className='col-span-2 sm:col-span-1'>
                        <label htmlFor="" className="text-sm font-medium font_man">
                            Residency (Optional)
                        </label>
                        <div
                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                        >
                            <input
                                onChange={(e) => setResidency(e.target.value)}
                                type="text"
                                value={residency}
                                placeholder="Input residency"
                                className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                            />
                        </div>
                    </div>

                </section >

                <div className="flex justify-between items-center mb-6 my-7">
                    <h4 className="font-bold text-xl md:text-2xl font_man text-main">Address info</h4>
                </div>

                <section>
                    <Label>Home address</Label>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2.5'>
                        {Object.keys(address).map((key) => (
                            <div
                                key={key}
                                className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[15px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                            >
                                <input
                                    name={key}
                                    onChange={handleChange}
                                    type="text"
                                    value={address[key]}
                                    placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                    className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full font_man !font-medium placeholder:!font-medium outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex justify-between items-center mt-7">
                    <div className='flex gap-2 item-center'>
                        <Label>
                            Current Address
                        </Label>
                        <div className='flex items-center gap-2'>
                            <p className='-mt-[2px]'>Same with Home address</p>
                            <input type='checkbox' value={currentAddressState} onClick={() => setCurrentAddressState(!currentAddressState)} />
                        </div>
                    </div>
                </div>

                <section className={currentAddressState && "opacity-40"}>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2.5'>
                        {Object.keys(address).map((key) => (
                            <div
                                key={key}
                                className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[15px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                            >
                                <input
                                    name={key}
                                    onChange={handleChangeCurrent}
                                    type="text"
                                    disabled={currentAddressState}
                                    value={currentAddress[key]}
                                    placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                    className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full font_man !font-medium placeholder:!font-medium outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex justify-between items-center mb-6 my-7">
                    <h4 className="font-bold text-xl md:text-2xl font_man text-main">Office and Status</h4>
                </div>

                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5'>
                    <div className='flex flex-col'>
                        <Label>Office</Label>
                        <Select
                            value={offficeLocation}
                            onChange={(e) => setOfficeLocation(e.target.value)}
                            className="!text-sm flex-1 !font-medium !rounded-lg !mt-[10px] font_man !text-primary"
                            IconComponent={ArrowIcon}
                        >
                            <MenuItem value="Dubai" className='!font-medium !text-sm'>Dubai</MenuItem>
                            <MenuItem value="Moscow" className='!font-medium !text-sm'>Moscow</MenuItem>
                            <MenuItem value="Istanbul" className='!font-medium !text-sm'>Istanbul</MenuItem>
                        </Select>
                    </div>

                </section>

                <div className="flex justify-between items-center mb-6 my-7">
                    <h4 className="font-bold text-xl md:text-2xl font_man text-main">Pricing</h4>
                </div>

                <section className='max-w-[720px]'>
                    <div>
                        <div className='flex flex-col'>
                            <Label>Payment method</Label>
                            <Select
                                value={installment}
                                onChange={(e) => setInstallment(e.target.value)}
                                className="!text-sm flex-1 !font-medium !border-border !rounded-lg !mt-[10px] font_man !text-primary"
                                IconComponent={ArrowIcon}
                            >
                                <MenuItem value="1" className='!font-medium !text-sm'>1 installment</MenuItem>
                                <MenuItem value="2" className='!font-medium !text-sm'>2 installments</MenuItem>
                                <MenuItem value="3" className='!font-medium !text-sm'>3 installments</MenuItem>
                            </Select>

                            <div className={`grid md:grid-cols-3 gap-2 md:gap-6 mt-2 md:mt-6 ${installment === "3" ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
                                <div>
                                    <Label>Total payment</Label>
                                    <div
                                        className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                    >
                                        <input
                                            onChange={(e) => setTotalPayment(e.target.value)}
                                            type="number"
                                            value={totalPayment}
                                            placeholder="2500"
                                            readOnly={totalPayment > 0 ? true : false}
                                            className={`text-gray-400 placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none`}
                                        />
                                    </div>
                                </div>
                                {
                                    installment === "1" && <div>
                                        <Label>First installment</Label>
                                        <div
                                            className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                        >
                                            <input
                                                onChange={(e) => setFirstInstallment(e.target.value)}
                                                type="number"
                                                value={firstInstallment}
                                                readOnly={firstInstallment > 0 ? true : false}
                                                placeholder="1250"
                                                className={`${firstInstallment > 0 ? "text-gray-400" : "text-black"}  placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none`}
                                            />
                                        </div>
                                    </div>
                                }

                                {
                                    installment === "2" && <>
                                        <div>
                                            <Label>First installment</Label>
                                            <div
                                                className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                            >
                                                <input
                                                    onChange={(e) => setFirstInstallment(e.target.value)}
                                                    type="number"
                                                    value={firstInstallment}
                                                    readOnly={firstInstallment > 0 ? true : false}
                                                    placeholder="1250"
                                                    className={`${firstInstallment > 0 ? "text-gray-400" : "text-black"} text-gray-400 placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Second Installment</Label>
                                            <div
                                                className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                            >
                                                <input
                                                    onChange={(e) => setSecoundInstallment(e.target.value)}
                                                    type="number"
                                                    value={secoundInstallment}
                                                    placeholder="Write second installment"
                                                    className={`text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none`}
                                                />
                                            </div>
                                        </div>


                                    </>
                                }

                                {
                                    installment === "3" && <>
                                        <div>
                                            <Label>First installment</Label>
                                            <div
                                                className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                            >
                                                <input
                                                    onChange={(e) => setFirstInstallment(e.target.value)}
                                                    type="number"
                                                    value={firstInstallment}
                                                    readOnly={firstInstallment > 0 ? true : false}
                                                    placeholder="1250"
                                                    className={`${firstInstallment > 0 ? "text-gray-400" : "text-black"} text-gray-400 placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Second Installment</Label>
                                            <div
                                                className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                            >
                                                <input
                                                    onChange={(e) => setSecoundInstallment(e.target.value)}
                                                    type="number"
                                                    value={secoundInstallment}
                                                    placeholder="Write second installment"
                                                    className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Third Installment</Label>
                                            <div
                                                className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                            >
                                                <input
                                                    onChange={(e) => setThirdInstallment(e.target.value)}
                                                    type="number"
                                                    value={thirdInstallment}
                                                    placeholder="Write third installment"
                                                    className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                                                />
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <p className='font_man mt-7 text-sm'>Total payment left: <strong className='font-bold text-lg'>${totalPayment - firstInstallment}</strong></p>
                </section>

                <section className='mt-7'>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-xl md:text-2xl font_man text-main">Documents</h4>
                    </div>
                    <div className='flex gap-4'>
                        <FileUpload setODocument={setODocument} />
                        <div>
                            {
                                attributes?.Other_Document?.data?.length > 0 && <div className='flex flex-wrap gap-2'>
                                    {
                                        attributes?.Other_Document?.data?.map((file, idx) => (
                                            <Link key={idx} href={file.attributes?.url || "#"} target='_blank'>
                                                <div className='flex items-center w-fit gap-3 py-[8px] px-3 border border-[#E2E4E9] rounded-[12px] my-1'>
                                                    <Image src="/pdf.svg" alt='' width={40} height={40} />
                                                    <h5 className='font-medium text-sm'>Appointment.pdf</h5>
                                                </div>
                                            </Link>
                                        ))
                                    }

                                </div>
                            }
                        </div>
                    </div>
                </section>

                <section className='flex gap-5 my-7 justify-end'>
                    {/* <button onClick={setNext(false)} className='border border-primary text-primary hover:scale-105 transition-all duration-150 font_man w-[162px] py-4 px-10 rounded-[10px]'>Back</button> */}
                    <button onClick={() => setNext(true)} className='bg-primary text-pure font_man w-[162px] hover:scale-105 transition-all duration-150 py-4 px-10 rounded-[10px]'>Next page</button>
                </section>
            </> : <>
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-xl md:text-2xl font_man text-main">Documents</h4>
                </div>
                <section className='grid sm:grid-cols-2 md:grid-cols-3 gap-x-5 md:gap-x-10 gap-y-3 md:!gap-y-6'>
                    {renderFileField("Passport", "passport")}
                    {renderFileField("Residence ID", "residenceID")}
                    {renderFileField("Biometric Photo", "biometricPhoto")}
                    {renderFileField("Other Documents", "otherDocuments")}
                </section>

                <section className='flex gap-5 my-7 justify-end mt-[240px]'>
                    <button onClick={() => {
                        setNext(false)
                    }} className='border border-primary text-primary hover:scale-105 transition-all duration-150 font_man py-4 px-10 rounded-[10px]'>Back</button>
                    <button onClick={handleUpdateApplication} className='bg-primary text-pure font_man hover:scale-105 transition-all duration-150 py-4 px-10 rounded-[10px]'>Create application</button>
                </section>

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

    )
}

export default EditApplicationModule


const ArrowIcon = () => (
    <svg width="14" height="10" viewBox="0 0 12 8" fill="none" className='mr-4'>
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.410826 0.910734C0.736263 0.585297 1.2639 0.585297 1.58934 0.910734L6.00008 5.32148L10.4108 0.910734C10.7363 0.585297 11.2639 0.585297 11.5893 0.910734C11.9148 1.23617 11.9148 1.76381 11.5893 2.08925L6.58934 7.08925C6.2639 7.41468 5.73626 7.41468 5.41083 7.08925L0.410826 2.08925C0.0853888 1.76381 0.0853888 1.23617 0.410826 0.910734Z"
            fill="#111827"
        />
    </svg>
);

const FileIcon = () => {
    return (
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.6665 0.875C9.01168 0.875 9.2915 1.15482 9.2915 1.5V4.83333C9.2915 4.88859 9.31345 4.94158 9.35252 4.98065C9.39159 5.01972 9.44458 5.04167 9.49984 5.04167H12.8332C13.1783 5.04167 13.4582 5.32149 13.4582 5.66667C13.4582 6.01184 13.1783 6.29167 12.8332 6.29167H9.49984C9.11306 6.29167 8.74213 6.13802 8.46864 5.86453C8.19515 5.59104 8.0415 5.22011 8.0415 4.83333V1.5C8.0415 1.15482 8.32133 0.875 8.6665 0.875Z" fill="#111827" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.83317 2.125C2.5569 2.125 2.29195 2.23475 2.0966 2.4301C1.90125 2.62545 1.7915 2.8904 1.7915 3.16667V14.8333C1.7915 15.1096 1.90125 15.3746 2.0966 15.5699C2.29195 15.7653 2.5569 15.875 2.83317 15.875H11.1665C11.4428 15.875 11.7077 15.7653 11.9031 15.5699C12.0984 15.3746 12.2082 15.1096 12.2082 14.8333V5.92555L8.40762 2.125H2.83317ZM1.21272 1.54621C1.64249 1.11644 2.22538 0.875 2.83317 0.875H8.6665C8.83226 0.875 8.99124 0.940848 9.10845 1.05806L13.2751 5.22472C13.3923 5.34193 13.4582 5.50091 13.4582 5.66667V14.8333C13.4582 15.4411 13.2167 16.024 12.787 16.4538C12.3572 16.8836 11.7743 17.125 11.1665 17.125H2.83317C2.22538 17.125 1.64249 16.8836 1.21272 16.4538C0.782947 16.024 0.541504 15.4411 0.541504 14.8333V3.16667C0.541504 2.55888 0.782947 1.97598 1.21272 1.54621Z" fill="#111827" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99984 13.7917C6.65466 13.7917 6.37484 13.5118 6.37484 13.1667L6.37484 8.16667C6.37484 7.82149 6.65466 7.54167 6.99984 7.54167C7.34502 7.54167 7.62484 7.82149 7.62484 8.16667L7.62484 13.1667C7.62484 13.5118 7.34502 13.7917 6.99984 13.7917Z" fill="#111827" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.94178 11.1086C9.6977 11.3527 9.30197 11.3527 9.0579 11.1086L6.99984 9.05055L4.94178 11.1086C4.6977 11.3527 4.30197 11.3527 4.0579 11.1086C3.81382 10.8645 3.81382 10.4688 4.0579 10.2247L6.5579 7.72472C6.80197 7.48065 7.1977 7.48065 7.44178 7.72472L9.94178 10.2247C10.1859 10.4688 10.1859 10.8645 9.94178 11.1086Z" fill="#111827" />
        </svg>
    )
}