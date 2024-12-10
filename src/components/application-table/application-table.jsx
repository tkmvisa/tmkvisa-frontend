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
    Paper,
    TableSortLabel,
    Pagination,
    Stack,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Menu,
    Snackbar,
    Alert,
} from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";


const MuiTableWithSortingAndPagination = ({ applicationsListProps }) => {

    const [applicationsList, setApplicationList] = useState(applicationsListProps);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("applicantName");
    const [currentPage, setCurrentPage] = useState(1);
    const [filterVisaType, setFilterVisaType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { toast, showToast, closeToast } = useToast();

    const router = useRouter()

    // Sorting logic
    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    // Ensure applicationsList?.data exists before sorting
    const sortedData = (applicationsList?.data || []).sort((a, b) => {
        const aValue = a.attributes[orderBy]?.toString().toLowerCase() || "";
        const bValue = b.attributes[orderBy]?.toString().toLowerCase() || "";

        return order === "asc"
            ? aValue > bValue
                ? 1
                : -1
            : aValue < bValue
            ? 1
            : -1;
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

    const renderStatusChip = (status) => {
        return (
            <Chip
                label={status}
                className={`
                    !text-xs !font_man !px-[15px] !font-bold rounded-[8px]
                    ${status === "APPROVED" ? "!bg-[#E7F7EF] !text-[#0CAF60]" : "!bg-[#FFF6D3] !text-[#E6BB20]"}
                `}
            />
        );
    };

    // For menu handling (anchorEl)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
    const handleEdit =(id)=>{
        router.push(`/en/edit-application/${id}`)
    }

    return (
        <>
            {/* Search  */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4 md:mb-6">
                <h4 className="font-bold text-2xl font_man text-main">Applications</h4>
                <input
                    placeholder="Search Application"
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
                    <MenuItem value="poland">Poland Visa</MenuItem>
                    <MenuItem value="usa">USA Visa</MenuItem>
                    <MenuItem value="germany">Germany Visa</MenuItem>
                </Select>

                {/* Status Filter */}
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="!text-sm !flex-1 !w-full !rounded-lg font_man !text-primary"
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="APPROVED">APPROVED</MenuItem>
                    <MenuItem value="PENDING">PENDING</MenuItem>
                    <MenuItem value="CREATED">CREATED</MenuItem>
                </Select>
            </Box>

            {/* Table */}
            <TableContainer className="">
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
                                    Applicant Name
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
                                    Date of Application
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
                                    Payment
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
                                    Visa Type
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
                                    Office
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
                                    Who Added
                                    <SortIcon />
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="font_man !border-none !text-[#687588] !rounded-tr-[10px] !rounded-br-[10px] !text-xs !font-bold !py-3">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => {
                            console.log("🚀 ~ {paginatedData.map ~ row:", row)
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
                                    <TableCell className="!text-xs !font_man capitalize">{row.attributes.users_permissions_user?.data?.attributes?.username}</TableCell>
                                    <TableCell className="!text-xs !font_man">
                                        <div className="flex items-center justify-center">
                                            {renderStatusChip(row.attributes.Application_Status)}
                                            <div>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    className="!p-0 hover:!bg-transparent"
                                                >
                                                    <CreateOutlinedIcon className="!text-gray-300 !px-0 hover:!text-success" />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    PaperProps={{
                                                        elevation: .7, // Adjust the shadow depth
                                                        sx: {
                                                            mt: 2,
                                                            borderRadius: '12px',
                                                            overflow: "visible",
                                                            boxShadow: "0px 0px 0px #64748b0d", // Custom shadow
                                                            border: "1px solid #64748b1f", // Custom shadow
                                                        },
                                                    }}

                                                >
                                                    <MenuItem onClick={()=>handleEdit(row?.id)} className="!text-sm !px-5 !py-[3px]">Edit</MenuItem>
                                                    <MenuItem onClick={() => handleDeleteApplication(row?.id)} className="!text-sm !px-5 !py-[3px]">Delete</MenuItem>
                                                </Menu>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <section className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6">
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

