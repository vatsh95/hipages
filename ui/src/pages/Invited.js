import React, { useState, useEffect } from 'react';
import ApiEndPoint from '../utils/Axios';
import InvitedLeadCards from '../components/leadCards/InvitedLeadCards';

/**
 * A Functional Component Loading and listing all Invited Leads and updating leads status
 */
const Invited = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [leadData, setLeadData] = useState([]);

    useEffect(() => {
        refreshLeads();
    }, []);

    const refreshLeads = () => {
        setLoading(true);
        ApiEndPoint.get('/invited')
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
            }, (error) => {
                setLoading(false);
                setError('Data Fetch Failed');
                console.log(error);
            });
    }

    const onLeadStatusChange = (id, status) => {
        console.log(id, status);
        ApiEndPoint
            .post(
                '/invited/status/'+ id,
                {
                    status: status
                }
            )
            .then((res) => {
                if(
                    res.status === 200
                    && 'success' in res.data
                    && res.data.success === true
                ) {
                    refreshLeads(); //As lead status is successfully updated
                } else {
                    setError('Status Change Failed');
                }                
            }, (error) => {
                setError('Status Change Failed');
            });
    }

    if(error !== '') {
        return(
            <p>{error}</p>
        );
    }

    return (
        <div className="invitedList">
            {
            (
                loading === true 
                && error === ''
            ) 
            ? "Loading Invitations Please wait"
            : <InvitedLeadCards leadList={leadData} onLeadStatusChange={(id, status) => onLeadStatusChange(id, status)} />
            }
        </div>
    );
}

export default Invited;