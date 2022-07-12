import { DanceLevel } from "../utils/enum/DanceLevel.enum";
import { Gender } from "../utils/enum/Gender.enum";
import { GroupStatus } from "../utils/enum/GroupStatus.enum";
import { DanceStyle } from "./danceStyle.model";
import { Instructor } from "./instructor.model";
import { Location } from "./location.model";

export type Group = {
    id: number;
    createDate: Date;
    groupStatus: GroupStatus;
    genderList: Gender[];
    danceLevel: DanceLevel;
    danceStyle: DanceStyle | string;
    location: Location | string;
    instructors: Instructor[];
}

export type GroupChoreo = {
    name: string;
} & Group

export type GroupCourse = {
    classroomDay: string;
    classroomStartTime: Date;
    classroomDuration: number;
} & Group

// export class Group {
//     id: number;
//     createDate: Date;
//     groupStatus: GroupStatus;
//     genderList: Gender[];
//     danceLevel: DanceLevel;
//     danceStyle: DanceStyle | string;
//     location: Location | string;
//     instructors: Instructor[];

//     constructor(id: number, createDate: Date, groupStatus: GroupStatus, genderList: Gender[], danceLevel: DanceLevel, danceStyle: DanceStyle | string, location: Location | string, instructors: Instructor[]) {
//         this.id = id;
//         this.createDate = createDate;
//         this.groupStatus = groupStatus;
//         this.genderList = genderList;
//         this.danceLevel = danceLevel;
//         this.danceStyle = danceStyle;
//         this.location = location;
//         this.instructors = instructors;
//     }
// }

// export class GroupChoreo extends Group {
//     name: string;

//     constructor(id: number, createDate: Date, groupStatus: GroupStatus, genderList: Gender[], danceLevel: DanceLevel, danceStyle: DanceStyle, location: Location, instructors: Instructor[], name: string) {
//         super(id, createDate, groupStatus, genderList, danceLevel, danceStyle, location, instructors);
//         this.name = name;
//     }
// }

// export class GroupCourse extends Group {
//     classroomDay: string;
//     classroomStartTime: Date;
//     classroomDuration: number;

//     constructor(id: number, createDate: Date, groupStatus: GroupStatus, genderList: Gender[], danceLevel: DanceLevel, danceStyle: DanceStyle, location: Location, instructors: Instructor[], classroomDay: string, classroomStartTime: Date, classroomDuration: number) {
//         super(id, createDate, groupStatus, genderList, danceLevel, danceStyle, location, instructors);
//         this.classroomDay = classroomDay;
//         this.classroomStartTime = classroomStartTime;
//         this.classroomDuration = classroomDuration;
//     }
// }