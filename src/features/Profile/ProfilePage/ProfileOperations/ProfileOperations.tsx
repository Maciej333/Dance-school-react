import React from 'react';
import { NavLink } from 'react-router-dom';
import SingleElementOperations from '../../../../app/components/SingleElement/SingleElementOperations/SingleElementOperations';
import { User } from '../../../../app/model/user.model';

export default function ProfileOperations(props: { user: User }) {

    const { user } = props;

    return (
        <SingleElementOperations
            Operations={
                <>
                    <NavLink to="/profile/edit" className="link">Edit profile</NavLink>
                    <NavLink to="/profile/password" className="link">Edit password</NavLink>
                    {
                        user.employee && !user.student ?
                            <NavLink to="/profile/student" className="link">Add student profile</NavLink>
                            :
                            null
                    }
                </>
            }
        />
    )
}
