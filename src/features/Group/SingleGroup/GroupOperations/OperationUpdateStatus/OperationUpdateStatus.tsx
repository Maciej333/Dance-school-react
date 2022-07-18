import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { updateGroupStatus } from "../../../../../app/api/group.api";
import { RefreshContext } from "../../../../../app/components/SingleElement/SingleElementByIdParam/SingleElementByIdParam";
import { GroupStatus } from "../../../../../app/utils/enum/GroupStatus.enum";
import { changeEnumToArray } from "../../../../../app/utils/functions/changeEnumToArray";

export default function OperationUpdateStatus(props: {
    closeModal: () => void;
    groupId: number;
    status: GroupStatus;
}) {
    const { closeModal, groupId, status } = props;
    const { refresh } = useContext(RefreshContext);
    const [formData, setFormData] = useState(GroupStatus[status] + "");
    const [formError, setFormError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFormData(value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateGroupStatus(groupId, Number(formData))
            .then((data) => {
                closeModal();
                refresh();
            })
            .catch((err) => {
                setFormError("[Error] Cannot update group status");
            });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <span className="main-error" style={{ marginTop: "10px" }}>
                {formError}
            </span>
            <label htmlFor="danceLevel">Dance level</label>
            <select
                id="groupStatus"
                name="groupStatus"
                value={formData}
                onChange={handleChange}
            >
                {changeEnumToArray(GroupStatus).map((el, id) => {
                    return (
                        <option
                            key={`[operation group status] = ${id}`}
                            value={GroupStatus[el as GroupStatus] + ""}
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
