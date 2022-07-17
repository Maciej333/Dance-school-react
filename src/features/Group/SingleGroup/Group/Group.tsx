import { lazy, Suspense } from "react";
import "./Group.style.scss";
import { Group as TGroup } from "../../../../app/model/group.model";
import { useAppSelector } from "../../../../app/hook/store.hook";
import { selectAuth } from "../../../../app/store/auth/authSlice";
import GroupInstructors from "./GroupInstructors/GroupInstructors";
import GroupData from "./GroupData/GroupData";

const GroupNews = lazy(() => import("./GroupNews/GroupNews"));

export default function Group(props: { group: TGroup | null }) {
    const { group } = props;

    const danceStyle =
        group?.danceStyle &&
        typeof group.danceStyle !== "string" &&
        group.danceStyle.name;

    const { id } = useAppSelector(selectAuth).user;

    return (
        <div className="group-component">
            <h2
                style={{
                    backgroundImage: `linear-gradient(-15deg, rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.70)), url("/images/${danceStyle}.jpg")`,
                }}
            >
                {group && group?.name
                    ? group.name
                    : group?.danceLevel
                    ? `${danceStyle} ${group.danceLevel}`
                    : null}
            </h2>

            <div className="content">
                <GroupInstructors
                    instructors={group?.instructors ? group.instructors : []}
                />
                <GroupData group={group} />
                <Suspense fallback={<></>}>
                    <GroupNews
                        userId={id}
                        groupId={group?.id ? group.id : -1}
                    />
                </Suspense>
            </div>
        </div>
    );
}
