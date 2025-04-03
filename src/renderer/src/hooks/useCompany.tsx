

import { Company } from "@renderer/types/types";
import React from "react";



const useCompany = () => {
    const [companyDetails, setCompanyDetails] = React.useState<Company>()


    const fetchCompany = async () => {
        const resp = await window.electron.getCompany();
        setCompanyDetails(resp);
        console.log("resp:", resp);
    }
    React.useEffect(() => {
        try {
            fetchCompany();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return { companyDetails, setCompanyDetails };
};

export default useCompany;