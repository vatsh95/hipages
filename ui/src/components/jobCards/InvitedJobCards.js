import React, { useState, useEffect } from 'react';

const InvitedJobCard = (props) => {
    return(
        <p>Card</p>
    );
}

const InvitedJobCards = (props) => {

    if(props.jobList.length === 0) {
        return <p>No Lead Invitations Found</p>
    }

    return(
        <React.Fragment>
            {
                (props.jobList).map(el => {
                    return <InvitedJobCard {...el} key={el.id} />
                })
            }
        </React.Fragment>
    );
};

export default InvitedJobCards;