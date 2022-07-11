import React from 'react';
import { getInstructors } from '../../../app/api/user.api';
import { withApi } from '../../../app/hoc/withApi';
import { Instructor } from '../../../app/model/instructor.model';
import InstructorCard from './InstructorCard/InstructorCard';
import './Instructors.style.scss';

const InstructorsComponent = (props: { apiData?: Instructor[] }) => {

  const { apiData } = props;

  return (
    apiData && apiData?.length > 0 ?
      <div className='instructors'>
        {
          apiData.map((el, id) => {
            return <InstructorCard key={`[instructor card] = ${id}`} instructor={el} />
          })
        }
      </div>
      :
      null
  )
}
const Instructors = withApi(InstructorsComponent, "cannot fetch instructors data", getInstructors);
export default Instructors;