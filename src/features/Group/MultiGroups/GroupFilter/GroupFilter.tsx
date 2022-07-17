import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DanceLevel } from "../../../../app/utils/enum/DanceLevel.enum";
import { getDanceStyles } from "../../../../app/api/danceStyle.api";
import { DanceStyle } from "../../../../app/model/danceStyle.model";
import { Location } from "../../../../app/model/location.model";
import { getAllLocations } from "../../../../app/api/location.api";
import { Gender } from "../../../../app/utils/enum/Gender.enum";
import { changeEnumToArray } from "../../../../app/utils/functions/changeEnumToArray";

export type groupFilters = {
    style: string | "";
    level: DanceLevel | "";
    location: string | "";
    gender: Gender | "";
};

export const initFilters: groupFilters = {
    style: "",
    level: "",
    location: "",
    gender: "",
};

export default function GroupFilter(props: {
    setFilters: (data: Object) => void;
}) {
    const [formData, setFormData] = useState<groupFilters>(initFilters);
    const [optionsStyle, setOptionsStyle] = useState<DanceStyle[]>([]);
    const [optionsLocation, setOptionsLocation] = useState<Location[]>([]);

    useEffect(() => {
        getDanceStyles().then((data) => {
            setOptionsStyle(data.data);
        });
        getAllLocations().then((data) => {
            setOptionsLocation(data.data);
        });
    }, []);

    const hangleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleClear = () => {
        setFormData(initFilters);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.setFilters(formData);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <button className="form-clear" onClick={handleClear}>
                Clear
            </button>

            <label htmlFor="style">Style</label>
            <select
                id="style"
                name="style"
                value={formData.style || ""}
                onChange={hangleChange}
            >
                <option value={""}>***</option>
                {optionsStyle.map((el, id) => {
                    return (
                        <option key={`[option style]=${id}`} value={el.name}>
                            {el.name}
                        </option>
                    );
                })}
            </select>

            <label htmlFor="level">Level</label>
            <select
                id="level"
                name="level"
                value={formData.level || ""}
                onChange={hangleChange}
            >
                <option value={""}>***</option>
                {changeEnumToArray(DanceLevel).map((el, id) => {
                    return (
                        <option
                            key={`[option level]=${id}`}
                            value={DanceLevel[Number(el)]}
                        >
                            {el + ""}
                        </option>
                    );
                })}
            </select>

            <label htmlFor="location">Location</label>
            <select
                id="location"
                name="location"
                value={formData.location || ""}
                onChange={hangleChange}
            >
                <option value={""}>***</option>
                {optionsLocation.map((el, id) => {
                    return (
                        <option
                            key={`[option location]=${id}`}
                            value={el.adress}
                        >
                            {el.adress}
                        </option>
                    );
                })}
            </select>

            <label htmlFor="gender">Gender</label>
            <select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={hangleChange}
            >
                <option value={""}>***</option>
                {changeEnumToArray(Gender).map((el, id) => {
                    return (
                        <option
                            key={`[option gender]=${id}`}
                            value={Gender[Number(el)]}
                        >
                            {el + ""}
                        </option>
                    );
                })}
            </select>

            <button type="submit">Submit</button>
        </form>
    );
}
