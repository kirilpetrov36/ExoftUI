export interface AuthResponse{
    token : string,
    refreshToken : string,
    userFirstName : string,
    userLastName : string,
    success: boolean,
    userId: string,
    avatarUrl: string,
    isAdmin: boolean
}