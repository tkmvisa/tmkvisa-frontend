"use client";
import React from 'react';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent
} from '@mui/lab';

const steps = [
    "Created",
    "Awaiting",
    "Invitation received",
    "Awaiting for an appointment",
    "Appointment scheduled",
    "Approved"
];

const ApplicationTimeline = ({ t, status }) => {
    return (
        <section className='mt-8'>
            <Timeline className='!px-0'>
                {steps.map((step, index) => (
                    <TimelineItem key={step}>
                        <TimelineOppositeContent className='hidden' sx={{ flex: 0.3 }}></TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot
                                sx={{ margin: '0px' }}
                                color={steps.indexOf(status) >= index ? "success" : undefined}
                            />
                            {index < steps.length - 1 && (
                                <TimelineConnector
                                    sx={{
                                        backgroundColor:
                                            steps.indexOf(status) > index ? "success.main" : "#e0e0e0",
                                        height: "100%"
                                    }}
                                />
                            )}
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className='-mt-6 pb-5'>
                                <p
                                    className={`!text-[15px] !font-medium font_man ${steps.indexOf(status) >= index ? "!text-black" : "text-[#94A3B8]"
                                        }`}
                                >
                                    {t[step.replace(/ /g, "_").toLowerCase()] || step}
                                </p>
                                {step === "Awaiting for an appointment" && (
                                    <p className='!text-[#FE7224] max-w-[270px] font_man !text-[12px]'>
                                        {t?.note}
                                    </p>
                                )}
                                <p className='!text-[#94A3B8] flex mt-[2px] items-center gap-1 !text-[13px] !font-medium'>
                                    <Clock />
                                    16:00, 21 June 2024
                                </p>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </section>
    );
};

export default ApplicationTimeline;

const Clock = () => {
    return (
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path
                d="M7.12402 12.25C10.0235 12.25 12.374 9.8995 12.374 7C12.374 4.1005 10.0235 1.75 7.12402 1.75C4.22453 1.75 1.87402 4.1005 1.87402 7C1.87402 9.8995 4.22453 12.25 7.12402 12.25Z"
                stroke="#94A3B8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.12402 4.08334V7.00001L8.87402 8.75001"
                stroke="#94A3B8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
