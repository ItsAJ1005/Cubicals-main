import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SuperProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is not authenticated or role is neither recruiter nor superUser
        if (!user || (user.role !== 'superUser')) {
            toast("Login as super user first to perform this activity!")
            navigate("/supreme");
        }
    }, [user, navigate]);

    return <>{children}</>;
};

export default SuperProtectedRoute;
