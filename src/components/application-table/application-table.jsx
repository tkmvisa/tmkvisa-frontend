"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Typography,
    Box,
    TableSortLabel,
    Pagination,
    MenuItem,
    Select,
    FormControl,
    Snackbar,
    Alert,
} from "@mui/material";
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { countries } from "@/utils/country-list"
import StatusButton from "./status-button"


export const renderStatusChip = (status) => {
    return (
        <Chip
            label={status}
            className={`
                !text-xs !font_man !px-[15px] !font-bold rounded-[8px]
                ${status === "Approved" ? "!bg-[#E7F7EF] !text-[#0CAF60]" : "!bg-[#FFF6D3] !text-[#E6BB20]"}
            `}
        />
    );
};


const MuiTableWithSortingAndPagination = ({ applicationsListProps, t }) => {

    const [applicationsList, setApplicationList] = useState(applicationsListProps);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("dateOfApplication");
    const [currentPage, setCurrentPage] = useState(1);
    const [filterVisaType, setFilterVisaType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    

    const { toast, showToast, closeToast } = useToast();

    const router = useRouter()

    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = (applicationsList?.data || []).sort((a, b) => {
        const aDate = new Date(a.attributes.publishedAt);
        const bDate = new Date(b.attributes.publishedAt);
        
        // Compare the actual Date objects or timestamps for sorting
        if (order === "asc") {
            return aDate - bDate;  // Ascending order
        } else {
            return bDate - aDate;  // Descending order
        }
    });


    // Filtering logic
    const filteredData = sortedData.filter((item) => {
        const attributes = item.attributes;
        const matchesVisaType =
            filterVisaType === "All" || attributes.country === filterVisaType;
        const matchesStatus =
            filterStatus === "All" || attributes.Application_Status === filterStatus;
        const matchesSearch =
            attributes.firstName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            attributes.lastName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            attributes.phoneNumber?.includes(searchQuery) ||
            attributes.email?.toLowerCase().includes(searchQuery?.toLowerCase());

        return matchesVisaType && matchesStatus && matchesSearch;
    });

    // Pagination logic
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to first page when rows per page change
    };

    // Deleting an application
    const handleDeleteApplication = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications/${id}`);
            showToast("Application Deleted!", "success");
            // Refetch applications
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications?populate[0]=users_permissions_user`);
            setApplicationList(data); // Set the new data into the state
            handleClose();
        } catch (error) {
            showToast("Failed to delete the application", "error");
        }
    };

    // Edit 
    const handleEdit = (id) => {
        router.push(`/en/edit-application/${id}`)
    }

    return (
        <>
            {/* Search  */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4 md:mb-6">
                <h4 className="font-bold text-2xl font_man text-main">{t.title}</h4>
                <input
                    placeholder={t?.search_field_placeholder}
                    value={searchQuery}
                    className="!placeholder:text-sm md:max-w-[300px] w-full !text-sm rounded-[10px] focus:!border-primary outline-none border border-border !px-5 !py-4 !text-[#A0AEC0]"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {/* Filters */}
            <Box className="!flex !justify-between !flex-col md:!flex-row !items-center" gap={2} mb={3}>
                {/* Visa Type Filter */}
                <Select
                    value={filterVisaType}
                    onChange={(e) => setFilterVisaType(e.target.value)}
                    className="!text-sm !flex-1 !w-full !rounded-lg font_man !text-primary"
                >
                    <MenuItem value="All">All</MenuItem>
                    {
                        countries?.map((item, idx) => (
                            <MenuItem value={item?.value} className='!font-medium !text-sm' key={idx}>{item?.name}</MenuItem>
                        ))
                    }
                </Select>

                {/* Status Filter */}
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="!text-sm !flex-1 !w-full !rounded-lg font_man !text-primary"
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Created">Created</MenuItem>
                    <MenuItem value="Awaiting">Awaiting</MenuItem>
                    <MenuItem value="Invitation received">Invitation received</MenuItem>
                    <MenuItem value="Awaiting for an appointment">Awaiting for an appointment</MenuItem>
                    <MenuItem value="Appointment scheduled">Appointment scheduled</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                </Select>
            </Box>

            {/* Table */}
            <TableContainer
                sx={{
                    width: "calc(100vw - 388px)",
                    "@media (max-width: 768px)": {
                        width: "calc(100vw - 32px)",
                    },
                }}
                className="!w-[calc(100vw - 376px)]">
                <Table>
                    <TableHead className="!bg-[#FAFAFA] font_man overflow-hidden !rounded-xl" sx={{ borderRadius: "12px" }}>
                        <TableRow>
                            <TableCell className="!border-none !rounded-tl-[10px] !rounded-bl-[10px]">
                                <TableSortLabel
                                    active={orderBy === "firstName"}
                                    direction={orderBy === "firstName" ? order : "asc"}
                                    onClick={() => handleSort("firstName")}
                                    className="font_man !text-[#687588] !text-xs !font-bold w-full flex justify-between gap-1 !py-3"
                                >
                                    {t?.table?.name}
                                    <SortIcon />
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="!border-none">
                                <TableSortLabel
                                    active={orderBy === "dateOfApplication"}
                                    direction={orderBy === "dateOfApplication" ? order : "asc"}
                                    onClick={() => handleSort("dateOfApplication")}
                                    className="font_man !text-[#687588] !text-xs !font-bold w-full flex justify-between gap-1 !py-3"

                                >
                                    {t?.table?.doa}
                                    <SortIcon />
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="!border-none">
                                <TableSortLabel
                                    active={orderBy === "Total_Payment"}
                                    direction={orderBy === "Total_Payment" ? order : "asc"}
                                    onClick={() => handleSort("Total_Payment")}
                                    className="font_man !text-[#687588] !text-xs !font-bold w-full flex justify-between gap-1 !py-3"

                                >
                                    {t?.table?.payment}
                                    <SortIcon />
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="!border-none">
                                <TableSortLabel
                                    active={orderBy === "Visa_Type"}
                                    direction={orderBy === "Visa_Type" ? order : "asc"}
                                    onClick={() => handleSort("Visa_Type")}
                                    className="font_man !text-[#687588] !text-xs !font-bold w-full flex justify-between gap-1 !py-3"

                                >
                                    {t?.table?.visa_type}
                                    <SortIcon />
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="!border-none">
                                <TableSortLabel
                                    active={orderBy === "Office_Location"}
                                    direction={orderBy === "Office_Location" ? order : "asc"}
                                    onClick={() => handleSort("Office_Location")}
                                    className="font_man !text-[#687588] !text-xs !font-bold w-full flex justify-between gap-1 !py-3"

                                >
                                    {t?.table?.office}
                                    <SortIcon />
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="!border-none">
                                <TableSortLabel
                                    active={orderBy === "whoAdded"}
                                    direction={orderBy === "whoAdded" ? order : "asc"}
                                    onClick={() => handleSort("whoAdded")}
                                    className="font_man !text-[#687588] !text-xs !font-bold w-full flex justify-between gap-1 !py-3"
                                >
                                    {t.table?.who_added}
                                    <SortIcon />
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="font_man !border-none !text-[#687588] !rounded-tr-[10px] !rounded-br-[10px] !text-xs !font-bold !py-3">{t.table?.Status}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData?.map((row) => {
                            const id = row.id
                            const date = new Date(row.attributes.publishedAt);
                            const formattedDate = new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }).format(date);

                            return (
                                <TableRow key={row.id} className="!group">
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Avatar sx={{ marginRight: 2 }} className="w-9 h-9">
                                                {row.applicantName?.[0]}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body1" className="font_man font-medium text-sm">{row.attributes.firstName} {row.attributes.lastName}</Typography>
                                                <Typography variant="body2" className="font_man !text-[#A0AEC0] !text-xs" color="textSecondary">
                                                    {row.attributes.phoneNumber}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell className="!text-xs !font_man">{formattedDate}</TableCell>
                                    <TableCell className="!text-xs !font_man">${row.attributes.Total_Payment}</TableCell>
                                    <TableCell className="!text-xs !font_man capitalize">{row.attributes.Visa_Type}</TableCell>
                                    <TableCell className="!text-xs !font_man capitalize">{row.attributes.Office_Location}</TableCell>
                                    <TableCell className="!text-xs !font_man capitalize">{row.attributes.Who_added}</TableCell>
                                    <TableCell className="!text-xs !font_man" >
                                        <div className="flex items-center !relative cursor-pointer justify-end" >
                                            <StatusButton status={row.attributes.Application_Status} id={id}/>
                                            <button className="ml-3" onClick={() => { handleEdit(row?.id) }}>
                                                <ModeEditOutlineOutlinedIcon className="!text-gray-300 !px-0 hover:!text-success" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer >

            {/* Pagination */}
            < section className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6" >
                <Pagination
                    count={Math.ceil(filteredData.length / rowsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    siblingCount={1}
                    boundaryCount={1}
                    shape="rounded"
                    className="pagination "
                    variant="outlined"
                />
                {/* Rows Per Page Selector */}
                <div className="flex justify-between items-center gap-4">
                    <p className="text-xs text-[#687588] font_man font-medium">Showing 1 to 8 of 50 entries</p>
                    <FormControl sx={{ willChangeidth: 87 }}>
                        <Select
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            size="small"
                            // sx={{ fontSize: '12px' }}
                            className="!text-xs !rounded-lg font_man !-text--text-gray"
                        >
                            <MenuItem value={5} className="!text-sm !rounded-lg font_man !text-primary">Show 5</MenuItem>
                            <MenuItem value={8} className="!text-sm !rounded-lg font_man !text-primary">Show 8</MenuItem>
                            <MenuItem value={10} className="!text-sm !rounded-lg font_man !text-primary">Show 10</MenuItem>
                            <MenuItem value={15} className="!text-sm !rounded-lg font_man !text-primary">Show 15</MenuItem>
                            <MenuItem value={20} className="!text-sm !rounded-lg font_man !text-primary">Show 20</MenuItem>
                        </Select>
                    </FormControl>

                </div>
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
    );
};

export default MuiTableWithSortingAndPagination;



const SortIcon = () => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" >
            <path d="M6.46055 2.32023C6.75848 2.0266 7.24152 2.0266 7.53945 2.32024L10.275 5.01642C10.7556 5.49009 10.4152 6.30001 9.73558 6.30001H4.26442C3.58476 6.30001 3.24438 5.49009 3.72498 5.01642L6.46055 2.32023Z" fill="#CBD5E0" />
            <path d="M6.46055 11.6798C6.75848 11.9734 7.24152 11.9734 7.53945 11.6798L10.275 8.98359C10.7556 8.50992 10.4152 7.70001 9.73558 7.70001H4.26442C3.58476 7.70001 3.24438 8.50992 3.72498 8.98359L6.46055 11.6798Z" fill="#CBD5E0" />
        </svg>
    )
}





