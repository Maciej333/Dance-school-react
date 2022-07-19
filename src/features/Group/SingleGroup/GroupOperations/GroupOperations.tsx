import React, { useContext, useEffect, useState } from "react";
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
import { checkIfIsInstructorGroup, checkIfStudentInGroup } from "../../../../app/api/group.api";
import { SingleElementContext } from "../../../../app/components/SingleElement/SingleElement";
import SingleElementOperations from "../../../../app/components/SingleElement/SingleElementOperations/SingleElementOperations";

export default function GroupOperations(props: { group: Group }) {

    const { group } = props;
    const { openModal, closeModal } = useContext(SingleElementContext);
    const { user, role } = useAppSelector(selectAuth);

    const [studentInGroup, setStudentInGroup] = useState(false);
    const [isInstructorGroup, setIsInstructorGroup] = useState(false);

    useEffect(() => {
        setStudentInGroup(false);
        setIsInstructorGroup(false);
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
                    setStudentInGroup(false);
                })
        }
        if (role && (+UserRole[role] === +UserRole.INSTRUCTOR)) {
            checkIfIsInstructorGroup(group.id, user.employee?.id ? user.employee.id : -1)
                .then(data => {
                    if (data.data) {
                        setIsInstructorGroup(true);
                    } else {
                        setIsInstructorGroup(false);
                    }
                })
                .catch(err => {
                    setIsInstructorGroup(false);
                })
        }
        if (role && (+UserRole[role] === +UserRole.DIRECTOR)) {
            setIsInstructorGroup(true);
        }
    }, [role, group.id, user])

    const handleShowRegisterToGroup = () => {
        openModal(
            <OperationRegisterToGroup
                closeModal={closeModal}
                groupId={group.id}
            />
        );
    };

    const handleShowUnregisterFromGroup = () => {
        openModal(
            <OperationUnregisterFromGroup
                closeModal={closeModal}
                groupId={group.id}
            />
        );
    };

    const handleShowUpdateLevel = () => {
        openModal(
            <OperationUpdateLevel
                closeModal={closeModal}
                groupId={group.id}
                level={group.danceLevel}
            />
        );
    };

    const handleShowUpdateStatus = () => {
        openModal(
            <OperationUpdateStatus
                closeModal={closeModal}
                groupId={group.id}
                status={group.groupStatus}
            />
        );
    };

    const handleShowUpdateInstructors = () => {
        openModal(
            <OperationUpdateInstructors
                closeModal={closeModal}
                groupId={group.id}
                instructors={group.instructors}
            />
        );
    };

    const handleShowDeleteGroup = () => {
        openModal(
            <OperationDeleteGroup
                closeModal={closeModal}
                groupId={group.id}
            />
        );
    };

    return (
        user.id > 0 ?
            <>
                {
                    studentInGroup
                        ?
                        <SingleElementOperations
                            Operations={
                                <ProtectedOperation
                                    roles={[UserRole.STUDENT]}
                                    onClick={handleShowUnregisterFromGroup}
                                    name="Unregister"
                                />
                            }
                        />
                        :
                        <ProtectedOperation
                            roles={[UserRole.STUDENT]}
                            onClick={handleShowRegisterToGroup}
                            name="Register"
                        />
                }
                {
                    isInstructorGroup ?
                        <SingleElementOperations
                            Operations={
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
                            }
                        />
                        :
                        null
                }
            </>
            :
            null
    );

}
