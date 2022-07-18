import { DanceLevel } from "../utils/enum/DanceLevel.enum";
import { Days } from "../utils/enum/Days.enum";
import { Gender } from "../utils/enum/Gender.enum";
import { GroupStatus } from "../utils/enum/GroupStatus.enum";
import { DanceStyle } from "./danceStyle.model";
import { Instructor } from "./instructor.model";
import { Location } from "./location.model";

export type Group = {
    [x: string]: unknown;
    id: number;
    createDate: Date;
    groupStatus: GroupStatus;
    genderList: Gender[];
    danceLevel: DanceLevel;
    danceStyle: DanceStyle | string;
    location: Location | string;
    instructors: Instructor[];
    name?: string;
    classroomDay?: Days;
    classroomStartTime?: string;
    classroomDuration?: number;
}
