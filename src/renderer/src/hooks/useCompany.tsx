import { Company } from "@renderer/types/types";
import React from "react";

const useCompany = () => {
    const [companyDetails, setCompanyDetails] = React.useState<Company | null>(null);
    const [trigger, setTrigger] = React.useState(false);

    const fetchCompany = async () => {
        try {
            const resp = await window.electron.getCompany();
            setCompanyDetails(resp);
            return resp;
        } catch (error) {
            console.error("Error fetching company:", error);
            return null;
        }
    };

    React.useEffect(() => {
        fetchCompany();
    }, [trigger]);

    const refetch = () => {
        setTrigger(prev => !prev);
    };

    return { 
        companyDetails, 
        setCompanyDetails, 
        refetch,
        fetchCompany // Add this for manual refetch if needed
    };
};

export default useCompany;