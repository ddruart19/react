export interface UserInputCreate {
    email: string
    name: string
    surname: string
    password: string
}

export interface UserInputConnection {
    email: string
    password: string
}

export interface UserOutputConnection {
    email: string
    password: string

}

export interface UserDB {
    id: number
    email: string
    name: string
    surname: string
    password: string
}