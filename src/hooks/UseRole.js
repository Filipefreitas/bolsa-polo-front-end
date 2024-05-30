import { useAuth } from '../context/AuthContext';

const useRole = (allowedRoles) => {
    const { userRole } = useAuth();
    return allowedRoles.includes(userRole);
};

export default useRole;