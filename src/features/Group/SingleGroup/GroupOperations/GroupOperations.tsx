import React, { useEffect, useState } from "react";
import './GroupOperations.style.scss';
import ProtectedLink from "../../../../app/components/Nav/ProtectedLink/ProtectedLink";
import ProtectedOperation from "../../../../app/components/SingleElement/ProtectedOperation/ProtectedOperation";
import { Group } from "../../../../app/model/group.model";
import { UserRole } from "../../../../app/utils/enum/UserRole.enum";
import OperationUpdateInstructors from "./OperationUpdateInstructors/OperationUpdateInstructors";
import OperationUpdateLevel from "./OperationUpdateLevel/OperationUpdateLevel";
import OperationUpdateStatus from "./OperationUpdateStatus/OperationUpdateStatus";
import OperationDeleteGroup from "./OperationDeleteGroup/OperationDeleteGroup";
import OperationRegisterToGroup from "./OperationRegisterToGroup/OperationRegisterToGroup";
import OperationUnregisterFromGroup from "./OperationUnregisterFromGroup/OperationUnregisterFromGroup";
import { useAppSelector } from "../../../../app/hook/store.hook";
import { selectAuth } from "../../../../app/store/auth/authSlice";
import { checkIfStudentInGroup } from "../../../../app/api/group.api";

const GroupOperations = (group: Group) => {
    const Operations = (props: {
        openModal: (content: JSX.Element) => void;
        closeModal: () => void;
    }) => {

        const { user, role } = useAppSelector(selectAuth);

        const [studentInGroup, setStudentInGroup] = useState(false);

        useEffect(() => {
            setStudentInGroup(false);
            if (role && (+UserRole[role] === +UserRole.STUDENT)) {
                checkIfStudentInGroup(group.id, user.student?.id ? user.student.id : -1)
                    .then(data => {
                        if (data.data) {
                            setStudentInGroup(true);
                        } else {
                            setStudentInGroup(false);
                        }
                    })
                    .catch(err => {
                        console.log("err")
                        setStudentInGroup(false);
                    })
            }
        }, [role, group.id, user.student?.id])

        const handleShowRegisterToGroup = () => {
            props.openModal(
                <OperationRegisterToGroup
                    closeModal={props.closeModal}
                    groupId={group.id}
                />
            );
        };

        const handleShowUnregisterFromGroup = () => {
            props.openModal(
                <OperationUnregisterFromGroup
                    closeModal={props.closeModal}
                    groupId={group.id}
                />
            );
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
                {
                    studentInGroup
                        ?
                        <ProtectedOperation
                            roles={[UserRole.STUDENT]}
                            onClick={handleShowUnregisterFromGroup}
                            name="Unregister"
                        />
                        :
                        <ProtectedOperation
                            roles={[UserRole.STUDENT]}
                            onClick={handleShowRegisterToGroup}
                            name="Register"
                        />
                }
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
    }
    return Operations;
};

export default GroupOperations;
