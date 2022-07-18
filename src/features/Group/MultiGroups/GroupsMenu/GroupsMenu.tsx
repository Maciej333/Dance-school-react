import React from 'react';
import './GroupsMenu.style.scss';
import { useNavigate } from 'react-router-dom';
import ProtectedOperation from '../../../../app/components/SingleElement/ProtectedOperation/ProtectedOperation';
import { useAppSelector } from '../../../../app/hook/store.hook';
import { selectAuth } from '../../../../app/store/auth/authSlice';
import { UserRole } from '../../../../app/utils/enum/UserRole.enum';

export const TGroupOpen = "OPEN";
export const TGroupStudent = "STUDENT";
export const TGroupInstructor = "INSTRUCTOR";
export const TGroupAll = "ALL";

export default function GroupsMenu() {

    const { id, roles } = useAppSelector(selectAuth).user;
    const navigate = useNavigate();

    const handleNavigate = (stateType: string) => () => {
        navigate("/group", { state: { type: stateType } })
    }

    const handleAddGroup = () => {
        navigate("/group/add");
    }

    return (
        id > 0 ?
            <div className='groups-menu'>
                <div className='groups-links'>
                    <button className='btn' onClick={handleNavigate(TGroupOpen)}>open groups</button>
                    <ProtectedOperation roles={[UserRole.STUDENT]} onClick={handleNavigate(TGroupStudent)} name="My groups" />
                    <ProtectedOperation roles={[UserRole.INSTRUCTOR]} onClick={handleNavigate(TGroupInstructor)} name="My groups" />
                    <ProtectedOperation roles={[UserRole.DIRECTOR]} onClick={handleNavigate(TGroupAll)} name="All grous" />
                </div>
                <div className='operations'>
                    <ProtectedOperation roles={[UserRole.INSTRUCTOR]} onClick={handleAddGroup} name="Add group" />
                </div>
            </div>
            :
            null
    )
}
