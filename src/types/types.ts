export type PostType = {
    id: number
    message: string
    like: number
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts:ProfileContactType
    photos: PhotosType

}

export type ProfileContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type UserType = {
    name: string,
    id: number
    photos: PhotosType
    status: string,
    followed: boolean
}