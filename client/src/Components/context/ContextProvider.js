import React, { createContext, useState } from 'react'

export const adddata = createContext("");
export const updatedata = createContext("");
export const deldata = createContext("");

const ContextProvider = ({ children }) => {
    const [udata, setUData] = useState("");
    const [updata, setUPData] = useState("");
    const [dltdata, setDLTData] = useState("");

    return (
        <adddata.Provider value={{ udata, setUData }}>
            <updatedata.Provider value={{ updata, setUPData }}>
                <deldata.Provider value={{ dltdata, setDLTData}}> 
            {children}
            </deldata.Provider>
            </updatedata.Provider>
        </adddata.Provider>
    );
};

export default ContextProvider;
