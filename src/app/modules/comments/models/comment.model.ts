import { User } from "../../articles-page/models/user.model";

export interface Comment {
    id: string;
    text: string;
    //username: string;
    //userId: string;
    user: User;
    parentId: null | string;
    createdAt: string;
}
// {
//     "text": "first comment of first user",
//     "user": null,
//     "parentComment": null,
//     "childComments": [],
//     "likes": [],
//     "id": "dccdd0be-0b90-4c11-34bf-08daaee33f5a",
//     "createdAt": "2022-10-15T22:27:07.0200542+03:00",
//     "updatedAt": "0001-01-01T00:00:00",
//     "createdBy": "8d1b2824-1b33-4789-1527-08daacb31ace",
//     "updatedBy": "00000000-0000-0000-0000-000000000000"
//   }