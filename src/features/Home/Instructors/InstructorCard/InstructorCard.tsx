import React from 'react';
import { Instructor } from '../../../../app/model/instructor.model';
import './InstructorCard.style.scss';

export default function InstructorCard(props: { instructor: Instructor }) {

    const { instructor } = props;

    return (
        <div className='instructor-card'>
            <div className='circle'>
                {
                    (instructor.user.firstname[0] ? instructor.user.firstname[0] : "")
                    + " " +
                    (instructor.user.lastname[0] ? instructor.user.lastname[0] : "")
                }
            </div>
            <p className='name'>{instructor.user.firstname + " " + instructor.user.lastname}</p>
        </div>
    )
}
