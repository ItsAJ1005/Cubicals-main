import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteCompanyDialog from './DeleteCompanyDialog'

const CompaniesTable = ({ refreshCompanies }) => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const [deleteDialogState, setDeleteDialogState] = useState({
        open: false,
        companyId: null
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])
    
    const handleDeleteClick = (companyId) => {
        setDeleteDialogState({
            open: true,
            companyId: companyId
        });
    };
    
    const handleCloseDeleteDialog = () => {
        setDeleteDialogState({
            open: false,
            companyId: null
        });
    };
    
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company.logo}/>
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div
                                            onClick={() => handleDeleteClick(company._id)}
                                            className="flex items-center gap-2 w-fit cursor-pointer text-red-600"
                                        >
                                            <Trash2 className="w-4" />
                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <DeleteCompanyDialog
                open={deleteDialogState.open}
                setOpen={handleCloseDeleteDialog}
                companyId={deleteDialogState.companyId}
                onDeleteSuccess={refreshCompanies}
            />
        </div>
    )
}

export default CompaniesTable