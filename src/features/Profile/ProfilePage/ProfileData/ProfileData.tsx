import React, { memo } from 'react';
import { User } from '../../../../app/model/user.model';
import { UserRole } from '../../../../app/utils/enum/UserRole.enum';

const ProfileDataComponent = (props: { user: User, role: UserRole }) => {

    const { user, role } = props;

    return (
        <div className="flex">
            <h3>Profile data</h3>

            <span>Firstname:</span>
            <span>{user.firstname}</span>
            <span>Lastname:</span>
            <span>{user.lastname}</span>
            {
                +UserRole[role] === +UserRole.DIRECTOR || +UserRole[role] === +UserRole.INSTRUCTOR
                    ?
                    <>
                        <span>Hired date:</span>
                        <span>{user.employee?.hiredDate ? new Date(user.employee.hiredDate).toLocaleDateString() : ''}</span>
                        <span>Fired date:</span>
                        <span>{user.employee?.firedDate ? new Date(user.employee.firedDate).toLocaleDateString() : '-'}</span>
                        <span>Phones:</span>
                        <span>{user.employee?.phoneNumers ? user.employee.phoneNumers.join(" , ") : ''}</span>
                    </>
                    :
                    null
            }
            {
                +UserRole[role] === +UserRole.STUDENT
                    ?
                    <>
                        <span>Gender:</span>
                        <span>{user.student?.gender ? user.student.gender : ''}</span>
                        <span>Discount:</span>
                        <span>{user.student?.discount ? user.student.discount : '-'}</span>
                        <span>Email:</span>
                        <span>{user.student?.email ? user.student.email : 'not found'}</span>
                    </>
                    :
                    null
            }
        </div>
    )
}

const ProfileData = memo(ProfileDataComponent);
export default ProfileData;