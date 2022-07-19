import React from 'react';
import SingleElement from '../../../app/components/SingleElement/SingleElement';
import { useAppSelector } from '../../../app/hook/store.hook';
import { selectAuth } from '../../../app/store/auth/authSlice';
import ProfileData from './ProfileData/ProfileData';
import ProfileOperations from './ProfileOperations/ProfileOperations';

export default function ProfilePage() {

    const { user, role } = useAppSelector(selectAuth);

    return (
        <SingleElement Operations={<ProfileOperations />} toNavigate="">
            <ProfileData user={user} role={role ? role : -1} />
        </SingleElement>
    )
}
