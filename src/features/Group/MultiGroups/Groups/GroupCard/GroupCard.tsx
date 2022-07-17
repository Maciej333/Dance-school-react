import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Group } from "../../../../../app/model/group.model";
import "./GroupCard.style.scss";

const GroupCardComponent = (props: { group: Group }) => {
    const { group } = props;

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/group/${group.id}`);
    };

    return (
        <div className="group-card" onClick={handleNavigate}>
            <div className="card-header">
                {group.name
                    ? group.name
                    : (typeof group.danceStyle === "string"
                          ? group.danceStyle
                          : group.danceStyle.name) +
                      " " +
                      group.danceLevel}
            </div>
            <div className="card-content">
                <span>
                    {typeof group.location === "string"
                        ? group.location
                        : group.location.adress}
                </span>
                <span>{group.genderList.join(" & ")}</span>
                {group.classroomStartTime ? (
                    <span>{group.classroomStartTime}</span>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

const GroupCard = memo(GroupCardComponent);
export default GroupCard;
