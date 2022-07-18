import React from "react";
import './GroupOperations.style.scss';
import ProtectedLink from "../../../../app/components/Nav/ProtectedLink/ProtectedLink";
import ProtectedOperation from "../../../../app/components/SingleElement/ProtectedOperation/ProtectedOperation";
import { Group } from "../../../../app/model/group.model";
import { UserRole } from "../../../../app/utils/enum/UserRole.enum";
import OperationUpdateInstructors from "./OperationUpdateInstructors/OperationUpdateInstructors";
import OperationUpdateLevel from "./OperationUpdateLevel/OperationUpdateLevel";
import OperationUpdateStatus from "./OperationUpdateStatus/OperationUpdateStatus";
import OperationDeleteGroup from "./OperationDeleteGroup/OperationDeleteGroup";

const GroupOperations =
    (group: Group) =>
        (props: {
            openModal: (content: JSX.Element) => void;
            closeModal: () => void;
        }) => {

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

            const handleShowUpdateInstructors = () => {
                props.openModal(
                    <OperationUpdateInstructors
                        closeModal={props.closeModal}
                        groupId={group.id}
                        instructors={group.instructors}
                    />
                );
            };

            const handleShowDeleteGroup = () => {
                props.openModal(
                    <OperationDeleteGroup
                        closeModal={props.closeModal}
                        groupId={group.id}
                    />
                );
            };

            return (
                <>
                    <div className="link-wrapper">
                        <ProtectedLink to={`/group/edit/${group.id}`} name="Edit group" auths={[UserRole.DIRECTOR, UserRole.INSTRUCTOR]} />
                    </div>
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
                    <ProtectedOperation
                        roles={[UserRole.DIRECTOR, UserRole.INSTRUCTOR]}
                        onClick={handleShowUpdateInstructors}
                        name="Edit instructors"
                    />
                    <ProtectedOperation
                        roles={[UserRole.DIRECTOR, UserRole.INSTRUCTOR]}
                        onClick={handleShowDeleteGroup}
                        name="Delete group"
                    />
                </>
            );
        };
export default GroupOperations;
