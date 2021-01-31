import React from 'react';
import { DateTime } from "luxon";
import { MdLocationOn, MdWork } from "react-icons/md";
import './LeadCard.css';

/**
 * A Dumb lead Card Component to list lead item
 */
const LeadCard = (props) => {
    const createdTime = DateTime.fromISO(props.created_at);
    return(
        <div className="leadCard row">
            <div className="nameArea section">
                <h1 className="firstChar">{props.contact_name.charAt(0)}</h1>
                <div className="nameTime">
                    <h3>{props.contact_name}</h3>
                    <p>{createdTime.toFormat("LLLL dd @ h:mm a")}</p>
                </div>
            </div>
            <div className="metaArea section">
                <p>
                    <MdLocationOn />&nbsp;{props.suburb_name}&nbsp;{props.postcode}&nbsp;
                    <MdWork />&nbsp;{props.category_name}&nbsp;
                    Job Id:&nbsp;{props.id}
                </p>
            </div>
            <div className="description section">
                <p>{props.description}</p>
            </div>
            <div className="btnArea section">
                <button className="primary" onClick={() => props.onLeadStatusChange(props.id, "accepted")}>Accept</button>
                <button onClick={() => props.onLeadStatusChange(props.id, "declined")}>Decline</button>
                <p className="priceArea">
                    <strong>${props.price}</strong> Lead Invitation
                </p>
            </div>
        </div>
    );
}

/**
 * A Listing Component to List All Invited Leads
 */
const InvitedLeadCards = (props) => {
    if(props.leadList.length === 0) {
        return <p>No Lead Invitations Found</p>
    }
    return(
        <React.Fragment>
            {
                (props.leadList).map(el => {
                    return <LeadCard {...el} key={el.id} onLeadStatusChange={(id, status) => props.onLeadStatusChange(id, status)} />
                })
            }
        </React.Fragment>
    );
};

export default InvitedLeadCards;