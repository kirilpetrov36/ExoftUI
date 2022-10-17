import { UserFile } from "./user-file.model";

export interface User{
    id: string,
    firstName: string,
    lastName: string,
    files: UserFile[],
    createdAt: string,
    updatedAt: string,
    createdBy: string,
    updatedBy: string
}