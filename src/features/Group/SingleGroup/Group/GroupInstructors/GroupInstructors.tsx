import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Instructor } from '../../../../../app/model/instructor.model';

export default function GroupInstructors(props: { instructors: Instructor[] | [] }) {

    const { instructors } = props;

    return (
        <div className='flex'>
            <h3>Instructors</h3>
            {
                instructors.map((el, id) => {
                    return <p key={`[group instructor] = ${id}`}>
                        <span>
                            <FontAwesomeIcon icon={faUser} className="color" />
                        </span>
                        <span>{el.user.firstname + " " + el.user.lastname}</span>
                    </p>;
                })
            }
        </div>
    )
}
