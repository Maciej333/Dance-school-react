import React from 'react'

export default function Groups(props: { filters: { name?: string } }) {

    console.log("GROUPS PROPS | ", props);

    const tab = [
        { name: "ABC" },
        { name: "AZC" },
        { name: "DEF" },
        { name: "GHI" },
        { name: "JKL" },
        { name: "AYB" },
    ]
    return (
        <div className='groups'>
            {
                tab
                    .filter(el => {
                        if (props.filters?.name) {
                            if (el.name.toLocaleLowerCase().includes(props.filters.name.toLocaleLowerCase().trim())) {
                                return true;
                            }
                            return false;
                        }
                        return true;
                    })
                    .map((el, id) => {
                        return <p key={`[groups] = ${id}`} style={{ backgroundColor: "red", padding: "20px" }}>{el.name}</p>
                    })
            }
        </div>
    )
}
