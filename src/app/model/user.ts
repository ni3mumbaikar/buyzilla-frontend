export interface User {
    userid: number | undefined,
    isAdmin: boolean | undefined,
    userName: string | undefined
}

export interface LoginUser {
    userName: string,
    password: string
}