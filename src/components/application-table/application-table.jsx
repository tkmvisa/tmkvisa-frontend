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
} from "@mui/material";

// Sample JSON Data
const data = [
    {
        id: 1,
        applicantName: "Pristia Candra",
        phone: "+905546326727",
        dateOfApplication: "01 Mar 2024",
        payment: "$2500",
        visaType: "POLAND VISA",
        office: "Dubai",
        whoAdded: "Gulchynar Pervazova",
        status: "APPROVED",
    },
    {
        id: 2,
        applicantName: "Hanna Baptista",
        phone: "+905546326727",
        dateOfApplication: "01 Mar 2024",
        payment: "$2500",
        visaType: "USA VISA",
        office: "Moscow",
        whoAdded: "Gulchynar Pervazova",
        status: "APPROVED",
    },
    {
        id: 1,
        applicantName: "Pristia Candra",
        phone: "+905546326727",
        dateOfApplication: "01 Mar 2024",
        payment: "$2500",
        visaType: "POLAND VISA",
        office: "Dubai",
        whoAdded: "Gulchynar Pervazova",
        status: "APPROVED",
    },
    {
        id: 2,
        applicantName: "Hanna Baptista",
        phone: "+905546326727",
        dateOfApplication: "01 Mar 2024",
        payment: "$2500",
        visaType: "USA VISA",
        office: "Moscow",
        whoAdded: "Gulchynar Pervazova",
        status: "APPROVED",
    },
    {
        id: 1,
        applicantName: "Pristia Candra",
        phone: "+905546326727",
        dateOfApplication: "01 Mar 2024",
        payment: "$2500",
        visaType: "POLAND VISA",
        office: "Dubai",
        whoAdded: "Gulchynar Pervazova",
        status: "APPROVED",
    },
    {
        id: 2,
        applicantName: "Xunair Baptista",
        phone: "+905546326727",
        dateOfApplication: "01 Mar 2024",
        payment: "$2500",
        visaType: "USA VISA",
        office: "Moscow",
        whoAdded: "Gulchynar Pervazova",
        status: "APPROVED",
    },
    {
        id: 1,
        applicantName: "Pristia Candra",
        phone: "+905546326727",
        dateOfApplication: "01 Mar 2024",
        payment: "$2500",
        visaType: "POLAND VISA",
        office: "Dubai",
        whoAdded: "Gulchynar Pervazova",
        status: "APPROVED",
    },
    {
        id: 2,
        applicantName: "Hanna Baptista",
        phone: "+905546326727",
        dateOfApplication: "01 Mar 2024",
        payment: "$2500",
        visaType: "USA VISA",
        office: "Moscow",
        whoAdded: "Gulchynar Pervazova",
        status: "APPROVED",
    },
];

const MuiTableWithSortingAndPagination = () => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("applicantName");
    const [currentPage, setCurrentPage] = useState(1);
    const [filterVisaType, setFilterVisaType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

    // Sorting logic
    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = [...data].sort((a, b) => {
        if (order === "asc") {
            return a[orderBy].toLowerCase() > b[orderBy].toLowerCase() ? 1 : -1;
        }
        return a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? 1 : -1;
    });

    // Filtering logic
    const filteredData = sortedData.filter((item) => {
        const matchesVisaType =
            filterVisaType === "All" || item.visaType === filterVisaType;
        const matchesStatus =
            filterStatus === "All" || item.status === filterStatus;
        const matchesSearch =
            item.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone.includes(searchQuery);

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
        const statusColors = {
            APPROVED: "success",
            PENDING: "warning",
            CREATED: "info",
        };

        return <Chip label={status} color={statusColors[status] || "default"} />;
    };

    return (
        <section className="px-6 py-8">
            <div className="bg-pure p-6 rounded-2xl">
                {/* Search  */}
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-2xl font_man text-main">Applications</h4>
                    <input
                        placeholder="Search Application"
                        value={searchQuery}
                        className="!placeholder:text-sm max-w-[300px] w-full !text-sm rounded-[10px] focus:!border-primary outline-none border border-border !px-5 !py-4 !text-[#A0AEC0]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* Filters */}
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mb={3}>
                    {/* Visa Type Filter */}
                    <Select
                        value={filterVisaType}
                        onChange={(e) => setFilterVisaType(e.target.value)}
                        className="!text-sm flex-1 !rounded-lg font_man !text-primary"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="POLAND VISA">POLAND VISA</MenuItem>
                        <MenuItem value="USA VISA">USA VISA</MenuItem>
                    </Select>

                    {/* Status Filter */}
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="!text-sm flex-1 !rounded-lg font_man !text-primary"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="APPROVED">APPROVED</MenuItem>
                        <MenuItem value="PENDING">PENDING</MenuItem>
                        <MenuItem value="CREATED">CREATED</MenuItem>
                    </Select>
                </Box>

                {/* Table */}
                <TableContainer>
                    <Table>
                        <TableHead className="!bg-[#FAFAFA] overflow-hidden !rounded-xl" sx={{ borderRadius: "12px"}}>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "applicantName"}
                                        direction={orderBy === "applicantName" ? order : "asc"}
                                        onClick={() => handleSort("applicantName")}
                                    >
                                        Applicant Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "dateOfApplication"}
                                        direction={orderBy === "dateOfApplication" ? order : "asc"}
                                        onClick={() => handleSort("dateOfApplication")}
                                    >
                                        Date of Application
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "payment"}
                                        direction={orderBy === "payment" ? order : "asc"}
                                        onClick={() => handleSort("payment")}
                                    >
                                        Payment
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "visaType"}
                                        direction={orderBy === "visaType" ? order : "asc"}
                                        onClick={() => handleSort("visaType")}
                                    >
                                        Visa Type
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "office"}
                                        direction={orderBy === "office" ? order : "asc"}
                                        onClick={() => handleSort("office")}
                                    >
                                        Office
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "whoAdded"}
                                        direction={orderBy === "whoAdded" ? order : "asc"}
                                        onClick={() => handleSort("whoAdded")}
                                    >
                                        Who Added
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Avatar sx={{ marginRight: 2 }}>
                                                {row.applicantName[0]}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body1">{row.applicantName}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {row.phone}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{row.dateOfApplication}</TableCell>
                                    <TableCell>{row.payment}</TableCell>
                                    <TableCell>{row.visaType}</TableCell>
                                    <TableCell>{row.office}</TableCell>
                                    <TableCell>{row.whoAdded}</TableCell>
                                    <TableCell>{renderStatusChip(row.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <section className="flex justify-between items-center mt-6">
                    <Pagination
                        count={Math.ceil(filteredData.length / rowsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        siblingCount={1}
                        boundaryCount={1}
                        shape="rounded"
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
            </div>
        </section>
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

