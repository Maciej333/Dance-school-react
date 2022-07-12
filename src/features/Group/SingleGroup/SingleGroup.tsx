import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function SingleGroup() {

    const { id } = useParams();

    useEffect(() => {
        console.log("params id = ", id)
    }, [id])
    
    return (
        <div>SingleGroup</div>
    )
}
