import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { updateGroupLevel } from "../../../../../app/api/group.api";
import { DanceLevel } from "../../../../../app/utils/enum/DanceLevel.enum";
import { changeEnumToArray } from "../../../../../app/utils/functions/changeEnumToArray";
import { RefreshContext } from "../../SingleGroup";

export default function OperationUpdateLevel(props: {
    closeModal: () => void;
    groupId: number;
    level: DanceLevel;
}) {
    const { closeModal, groupId, level } = props;
    const { refresh } = useContext(RefreshContext);
    const [formData, setFormData] = useState(DanceLevel[level] + "");
    const [formError, setFormError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFormData(value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("handleSubmit", Number(formData));

        updateGroupLevel(groupId, Number(formData))
            .then((data) => {
                console.log("Data ", data);
                refresh();
                closeModal();
            })
            .catch((err: Error) => {
                console.log("err ", err);
                setFormError("[Error] Cannot update group level");
            });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <span className="main-error" style={{ marginTop: "10px" }}>
                {formError}
            </span>
            <label htmlFor="danceLevel">Dance level</label>
            <select
                id="danceLevel"
                name="danceLevel"
                value={formData}
                onChange={handleChange}
            >
                {changeEnumToArray(DanceLevel).map((el, id) => {
                    return (
                        <option
                            key={`[operation dance level] = ${id}`}
                            value={DanceLevel[el as DanceLevel] + ""}
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
