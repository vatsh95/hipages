import React, { useState, useEffect } from 'react';
import ApiEndPoint from '../utils/Axios';
import InvitedJobCards from '../components/jobCards/InvitedJobCards';

const Invited = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        ApiEndPoint.get('/invited')
            .then((res) => {
                if(
                    res.status === 200
                    && 'success' in res.data
                    && res.data.success === true
                ) {
                    setLoading(false);
                    setData(res.data.data);
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
        <div className="invitedList">
            {
            (
                loading === true 
                && error === ''
            ) 
            ? "Loading Invitations Please wait"
            : <InvitedJobCards jobList={data} />
            }
        </div>
    );
}

export default Invited;