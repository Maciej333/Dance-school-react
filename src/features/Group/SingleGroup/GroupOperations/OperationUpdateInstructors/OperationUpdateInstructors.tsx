import React, { useContext, useEffect, useState } from "react";
import "./OperationUpdateInstructors.style.scss";
import { updateGroupInstructors } from "../../../../../app/api/group.api";
import { getInstructors } from "../../../../../app/api/user.api";
import MultiSelect, {
    IMultiSelect,
} from "../../../../../app/components/MultiSelect/MultiSelect";
import { RefreshContext } from "../../../../../app/components/SingleElement/SingleElementByIdParam/SingleElementByIdParam";
import { Instructor } from "../../../../../app/model/instructor.model";

export default function OperationUpdateInstructors(props: {
    closeModal: () => void;
    groupId: number;
    instructors: Instructor[];
}) {
    const { closeModal, groupId, instructors } = props;
    const { refresh } = useContext(RefreshContext);

    const [formData, setFormData] = useState<IMultiSelect[] | []>([]);
    const [selectedFormData, setSelectedFormData] = useState<number[]>([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        getInstructors()
            .then((data) => {
                setFormData(
                    (data.data as Instructor[]).map((el) => {
                        return {
                            id: el.id,
                            value: `${el.user.firstname} ${el.user.lastname}`,
                            toString: () =>
                                `${el.user.firstname} ${el.user.lastname}`,
                        };
                    })
                );
            })
            .catch((err) => {
                setFormError("Cannot fetch instructors data");
            });
    }, []);

    useEffect(() => {
        setSelectedFormData(instructors.map((el) => el.id));
    }, [groupId, instructors]);

    const handleSelect = (toSelect: number[]) => {
        setSelectedFormData(toSelect);
    };

    const handleSubmit = () => {
        updateGroupInstructors(groupId, selectedFormData)
            .then(() => {
                closeModal();
                refresh();
            })
            .catch(() => {
                setFormError("[Error] Cannot update group instructors");
            });
    };

    return (
        <div className="operation-update-instructors">
            <span className="main-error" style={{ marginTop: "10px" }}>
                {formError}
            </span>
            <span className="label">Instructors</span>
            <MultiSelect
                all={formData}
                selected={selectedFormData}
                select={handleSelect}
            />
            <button className="btn" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}
