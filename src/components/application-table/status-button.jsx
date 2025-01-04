"use state"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { renderStatusChip } from './application-table';

export default function StatusButton({ row, handleUpdateStatus }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {renderStatusChip(row.attributes.Application_Status)}
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
    );
}
