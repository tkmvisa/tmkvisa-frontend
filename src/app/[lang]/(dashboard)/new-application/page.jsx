"use client"
import React, { useState } from 'react'
import Label from "@/components/ui/label";
import {  MenuItem, Select, TextField } from '@mui/material';

const NewApplication = () => {
    const [visaType, setVisType] = useState('work')
    const [visaType2, setVisType2] = useState('work')
    const [countery, setCountry] = useState('poland')
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [nationality, setNationality] = useState('')
    const [pNumber, setPNumber] = useState('')
    const [pValidityDate, setPValidityDate] = useState('');
    const [residency, setResidency] = useState('');
    const [currentAddressState, setCurrentAddressState] = useState(false);
    const [installment, setInstallment] = useState(2);
    const [totalPayment, setTotalPayment] = useState();
    const [next, setNext] = useState(false);
    const [emailLang, setEmailLang] = useState('turkmen');

    const [document, setDocument] = useState({
        passport: "",
        residenceID: "",
        biometricPhoto: "",
        otherDocuments: "",
    })

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB = 5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB!");
                return;
            }
            // Validate file format (PDF)
            if (file.type !== "application/pdf") {
                alert("Only PDF files are allowed!");
                return;
            }

            setDocument((prevState) => ({
                ...prevState,
                [fieldName]: file,
            }));
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
        city: "",
        street: "",
        aptNo: "",
        zipcode: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeCurrent = (e) => {
        const { name, value } = e.target;
        setcurrentAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateApplication = async () => {
        const data = {
            "data": {
                "Visa_Type" : "Visa_Type",

            },
        }

        const rawResponse = await fetch(`${process.env.STRAPI_BASE_URL}/api/applications`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${process.env.STRAPI_TOKEN}`
            },
            body: JSON.stringify(data)
        });
        const app = await rawResponse.json();
        console.log("🚀 ~ handleCreateApplication ~ content:", app)
    }



    const renderFileField = (label, fieldName) => (
        <div>
            <Label>{label}</Label>
            <label
                htmlFor={fieldName}
                className={`flex justify-between cursor-pointer items-center mt-2.5 bg-lite-gray pt-[16px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
            >
                {/* Left Text */}
                <span className="text-sm text-primary font-medium flex-grow">
                    {document[fieldName]?.name || `Upload ${label}`}
                </span>

                {/* Right Icon */}
                <label

                    className="cursor-pointer text-[#A0AEC0] text-lg"
                >
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.6665 0.875C9.01168 0.875 9.2915 1.15482 9.2915 1.5V4.83333C9.2915 4.88859 9.31345 4.94158 9.35252 4.98065C9.39159 5.01972 9.44458 5.04167 9.49984 5.04167H12.8332C13.1783 5.04167 13.4582 5.32149 13.4582 5.66667C13.4582 6.01184 13.1783 6.29167 12.8332 6.29167H9.49984C9.11306 6.29167 8.74213 6.13802 8.46864 5.86453C8.19515 5.59104 8.0415 5.22011 8.0415 4.83333V1.5C8.0415 1.15482 8.32133 0.875 8.6665 0.875Z" fill="#111827" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.83317 2.125C2.5569 2.125 2.29195 2.23475 2.0966 2.4301C1.90125 2.62545 1.7915 2.8904 1.7915 3.16667V14.8333C1.7915 15.1096 1.90125 15.3746 2.0966 15.5699C2.29195 15.7653 2.5569 15.875 2.83317 15.875H11.1665C11.4428 15.875 11.7077 15.7653 11.9031 15.5699C12.0984 15.3746 12.2082 15.1096 12.2082 14.8333V5.92555L8.40762 2.125H2.83317ZM1.21272 1.54621C1.64249 1.11644 2.22538 0.875 2.83317 0.875H8.6665C8.83226 0.875 8.99124 0.940848 9.10845 1.05806L13.2751 5.22472C13.3923 5.34193 13.4582 5.50091 13.4582 5.66667V14.8333C13.4582 15.4411 13.2167 16.024 12.787 16.4538C12.3572 16.8836 11.7743 17.125 11.1665 17.125H2.83317C2.22538 17.125 1.64249 16.8836 1.21272 16.4538C0.782947 16.024 0.541504 15.4411 0.541504 14.8333V3.16667C0.541504 2.55888 0.782947 1.97598 1.21272 1.54621Z" fill="#111827" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99984 13.7917C6.65466 13.7917 6.37484 13.5118 6.37484 13.1667L6.37484 8.16667C6.37484 7.82149 6.65466 7.54167 6.99984 7.54167C7.34502 7.54167 7.62484 7.82149 7.62484 8.16667L7.62484 13.1667C7.62484 13.5118 7.34502 13.7917 6.99984 13.7917Z" fill="#111827" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.94178 11.1086C9.6977 11.3527 9.30197 11.3527 9.0579 11.1086L6.99984 9.05055L4.94178 11.1086C4.6977 11.3527 4.30197 11.3527 4.0579 11.1086C3.81382 10.8645 3.81382 10.4688 4.0579 10.2247L6.5579 7.72472C6.80197 7.48065 7.1977 7.48065 7.44178 7.72472L9.94178 10.2247C10.1859 10.4688 10.1859 10.8645 9.94178 11.1086Z" fill="#111827" />
                    </svg>

                </label>
                <input
                    id={fieldName}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, fieldName)}
                    className="hidden"
                />
            </label>
            <p className='text-xs mt-1 text-[#687588]'>
                Max file size: 5MB. File format: PDF
            </p>
        </div>
    );

    return (
        !next ?
            <>
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-xl md:text-2xl font_man text-main">New application</h4>
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
                            <MenuItem value="work" className='!font-medium !text-sm'>Work visa</MenuItem>
                            <MenuItem value="study" className='!font-medium !text-sm'>Study visa</MenuItem>
                            <MenuItem value="visit" className='!font-medium !text-sm'>Visit visa</MenuItem>
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
                            <MenuItem value="poland" className='!font-medium !text-sm'>Poland</MenuItem>
                            <MenuItem value="germany" className='!font-medium !text-sm'>Germany</MenuItem>
                            <MenuItem value="usa" className='!font-medium !text-sm'>USA</MenuItem>
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
                                type="text"
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
                    <div className='flex flex-col'>
                        <Label>Visa Type</Label>
                        <Select
                            value={visaType2}
                            onChange={(e) => setVisType2(e.target.value)}
                            className="!text-sm flex-1 !font-medium !rounded-lg !mt-[10px] font_man !text-primary"
                            IconComponent={ArrowIcon}
                        >
                            <MenuItem value="work" className='!font-medium !text-sm'>Work visa</MenuItem>
                            <MenuItem value="study" className='!font-medium !text-sm'>Study visa</MenuItem>
                            <MenuItem value="visit" className='!font-medium !text-sm'>Visit visa</MenuItem>
                        </Select>
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
                                type="date"
                                value={pValidityDate}
                                onChange={setPValidityDate}
                                fullWidth
                                variant="outlined"
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
                        <Label>Residency (Optional)</Label>
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

                            <div className='grid md:grid-cols-3 gap-2 md:gap-6 mt-2 md:mt-6'>
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
                                            className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>First installment</Label>
                                    <div
                                        className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                    >
                                        <input
                                            onChange={(e) => setTotalPayment(e.target.value)}
                                            type="number"
                                            value={totalPayment}
                                            placeholder="1250"
                                            className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Second Installment</Label>
                                    <div
                                        className={`flex justify-between mt-2.5 items-center gap-3 bg-lite-gray pt-[12px] pb-[16px] px-5 rounded-[10px] border-[1px]`}
                                    >
                                        <input
                                            onChange={(e) => setTotalPayment(e.target.value)}
                                            type="number"
                                            value={totalPayment}
                                            placeholder="Write second installment"
                                            className="text-black placeholder:text-[#A0AEC0] placeholder:text-sm w-full outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='font_man mt-7 text-sm'>Total payment left: <strong className='font-bold text-lg'>$1250</strong></p>
                </section>

                <section className='flex gap-5 my-7 justify-end'>
                    <button className='border border-primary text-primary hover:scale-105 transition-all duration-150 font_man w-[162px] py-4 px-10 rounded-[10px]'>Cancel</button>
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
                <section className=' mt-8'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        <div className='flex flex-col'>
                            <Label>Preferred Email language</Label>
                            <Select
                                value={emailLang}
                                onChange={(e) => setEmailLang(e.target.value)}
                                className="!text-sm flex-1 !font-medium !border-border !rounded-lg !mt-[10px] font_man !text-primary"
                                IconComponent={ArrowIcon}
                            >
                                <MenuItem value="turkmen" className='!font-medium !text-sm'>Turkmen</MenuItem>
                                <MenuItem value="english" className='!font-medium !text-sm'>English</MenuItem>
                                <MenuItem value="russian" className='!font-medium !text-sm'>Russian</MenuItem>
                            </Select>
                        </div>
                    </div>
                </section>

                <section className='flex gap-5 my-7 justify-end mt-[240px]'>
                    <button className='border border-primary text-primary hover:scale-105 transition-all duration-150 font_man py-4 px-10 rounded-[10px]'>Cancel</button>
                    <button onClick={handleCreateApplication} className='bg-primary text-pure font_man hover:scale-105 transition-all duration-150 py-4 px-10 rounded-[10px]'>Create application</button>
                </section>
            </>

    )
}

export default NewApplication


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
