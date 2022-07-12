import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleElement from '../../../app/components/SingleElement/SingleElement';
import { funGroup } from './Group/Group';
import GroupOperations from './GroupOperations/GroupOperations';

export default function SingleGroup() {

    const { id } = useParams();

    const [idNumber, setIdNumber] = useState<number>(0);

    useEffect(() => {
        if (id?.match(/\d+/))
            setIdNumber(+id);
    }, [id])

    return (
        <SingleElement
            Operations={GroupOperations}
        >
            {
                idNumber > 0 ?
                    funGroup(idNumber)
                    :
                    null
            }
        </SingleElement>

    )
}
