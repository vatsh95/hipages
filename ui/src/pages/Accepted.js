import React, { useState, useEffect } from 'react';
import ApiEndPoint from '../utils/Axios';
import AcceptedLeadCards from '../components/leadCards/AcceptedLeadCards';

/**
 * A Functional Component listing all Accepted Leads
 */
const Accepted = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [leadData, setLeadData] = useState([]);

    useEffect(() => {
        setLoading(true);
        ApiEndPoint.get('/accepted')
            .then((res) => {
                if(
                    res.status === 200
                    && 'success' in res.data
                    && res.data.success === true
                ) {
                    setLoading(false);
                    setLeadData(res.data.data);
                } else {
                    setLoading(false);
                    setError('Data Fetch Failed');
                }                
                console.log(res);
            }, (error) => {
                setLoading(false);
                setError('Data Fetch Failed');
                console.log(error);
            });
    }, []);

    if(error !== '') {
        return(
            <p>{error}</p>
        );
    }

    return (
        <div className="acceptedList">
            {
            (
                loading === true 
                && error === ''
            ) 
            ? "Loading Invitations Please wait"
            : <AcceptedLeadCards leadList={leadData} />
            }
        </div>
    );
}

export default Accepted;