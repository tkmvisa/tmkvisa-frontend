"use client"
import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from '@mui/lab';

const ApplicationTimeline = ({t}) => {
    return (
        <section className='mt-4'>
            <Timeline className='!px-0'>
                {/* Step 1 */}
                <TimelineItem>
                    <TimelineOppositeContent className='hidden' sx={{ flex: 0.3 }}>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="success" />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <p className='!text-[15px] !font-medium font_man'>
                            {t.created}
                        </p>
                        <p className='!text-[#94A3B8] flex font_man items-center gap-1 !text-[13px] !font-medium'>
                            <Clock />
                            09:00, 20 June 2024
                        </p>
                    </TimelineContent>
                </TimelineItem>

                {/* Step 2 */}
                <TimelineItem>
                    <TimelineOppositeContent className='hidden' sx={{ flex: 0.3 }}>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <p className='!text-[15px] text-[#94A3B8] !font-semibold font_man'>
                            {t?.waiting_invitation}
                        </p>
                        <p className='!text-[#94A3B8] flex font_man items-center gap-1 !text-[13px] !font-medium'>
                            <Clock />
                            16:00, 21 June 2024
                        </p>
                    </TimelineContent>
                </TimelineItem>

                {/* Step 3 */}
                <TimelineItem>
                    <TimelineOppositeContent className='hidden' sx={{ flex: 0.3 }}>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <p className='!text-[15px] text-[#94A3B8] !font-semibold font_man'>
                            {t?.invitation_receive}
                        </p>
                        <p className='!text-[#94A3B8] font_man !text-[12px]'>Note:</p>
                        <p className='!text-[#94A3B8] flex  mt-[2px] items-center gap-1 !text-[13px] !font-medium'>
                            <Clock />
                            16:00, 21 June 2024
                        </p>
                    </TimelineContent>
                </TimelineItem>

                {/* Step 4 */}
                <TimelineItem>
                    <TimelineOppositeContent className='hidden' sx={{ flex: 0.3 }}>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <p className='!text-[15px] text-[#94A3B8] !font-semibold font_man'>
                            {t?.waiting_appointment}
                        </p>
                        <p className='!text-[#FE7224] max-w-[270px] font_man !text-[12px]'>{t?.note}</p>
                        <p className='!text-[#94A3B8] flex  mt-[2px] items-center gap-1 !text-[13px] !font-medium'>
                            <Clock />
                            16:00, 21 June 2024
                        </p>
                    </TimelineContent>
                </TimelineItem>

                {/* Step 5 */}
                <TimelineItem>
                    <TimelineOppositeContent className='hidden' sx={{ flex: 0.3 }}>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector className='invisible'/>
                    </TimelineSeparator>
                    <TimelineContent>
                        <p className='!text-[15px] text-[#94A3B8] !font-semibold font_man'>
                            {t.appointment_schedule}
                        </p>
                        <p className='!text-[#94A3B8] max-w-[270px] font_man !text-[12px]'>{t?.appoinment_date_is} 17.12.2024</p>
                        <p className='!text-[#94A3B8] flex  mt-[2px] items-center gap-1 !text-[13px] !font-medium'>
                            <Clock />
                            16:00, 21 June 2024
                        </p>
                    </TimelineContent>
                </TimelineItem>

                {/* Step 5 */}
                <TimelineItem>
                    <TimelineOppositeContent className='hidden' sx={{ flex: 0.3 }}>
                    </TimelineOppositeContent>
                    <TimelineSeparator className='invisible'>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <p className='!text-[15px] text-[#94A3B8] !font-semibold font_man'>
                        {t?.Completed}
                        </p>
                        <p className='!text-[#94A3B8] flex  mt-[2px] items-center gap-1 !text-[13px] !font-medium'>
                            <Clock />
                            16:00, 21 June 2024
                        </p>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </section>
    );
};

export default ApplicationTimeline;


const Clock = () => {
    return (
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" >
            <path d="M7.12402 12.25C10.0235 12.25 12.374 9.8995 12.374 7C12.374 4.1005 10.0235 1.75 7.12402 1.75C4.22453 1.75 1.87402 4.1005 1.87402 7C1.87402 9.8995 4.22453 12.25 7.12402 12.25Z" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.12402 4.08334V7.00001L8.87402 8.75001" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}