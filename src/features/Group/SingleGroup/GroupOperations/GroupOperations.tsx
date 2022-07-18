import React from "react";
import ProtectedOperation from "../../../../app/components/SingleElement/ProtectedOperation/ProtectedOperation";
import { Group } from "../../../../app/model/group.model";
import { UserRole } from "../../../../app/utils/enum/UserRole.enum";
import OperationUpdateLevel from "./OperationUpdateLevel/OperationUpdateLevel";
import OperationUpdateStatus from "./OperationUpdateStatus/OperationUpdateStatus";

const GroupOperations =
    (group: Group) =>
    (props: {
        openModal: (content: JSX.Element) => void;
        closeModal: () => void;
    }) => {
        const modalABC = <p>ABC</p>;
        const handleShowABC = () => {
            props.openModal(modalABC);
        };

        const handleShowUpdateLevel = () => {
            props.openModal(
                <OperationUpdateLevel
                    closeModal={props.closeModal}
                    groupId={group.id}
                    level={group.danceLevel}
                />
            );
        };

        const handleShowUpdateStatus = () => {
            props.openModal(
                <OperationUpdateStatus
                    closeModal={props.closeModal}
                    groupId={group.id}
                    status={group.groupStatus}
                />
            );
        };

        return (
            <>
                <button className="btn" onClick={handleShowABC}>
                    ABC
                </button>

                <ProtectedOperation
                    roles={[UserRole.DIRECTOR, UserRole.INSTRUCTOR]}
                    onClick={handleShowUpdateLevel}
                    name="Edit level"
                />
                <ProtectedOperation
                    roles={[UserRole.DIRECTOR, UserRole.INSTRUCTOR]}
                    onClick={handleShowUpdateStatus}
                    name="Edit status"
                />
            </>
        );
    };
export default GroupOperations;
