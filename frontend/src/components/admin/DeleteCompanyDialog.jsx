import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';

const DeleteCompanyDialog = ({ open, setOpen, companyId }) => {
    const [loading, setLoading] = useState(false);

    const deleteHandler = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`${USER_API_END_POINT}/companies/${companyId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success('Company deleted successfully');
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to delete company');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this company?</DialogTitle>
                    <p className='text-sm pt-4'>*Deleting this company cannot be recovered and all the data related to it will be lost permanently</p>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={deleteHandler} disabled={loading}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Confirm'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCompanyDialog;
