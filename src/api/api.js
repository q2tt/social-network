import axios from "axios";
import currentDate from './../utils/data'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '11730b4a-5354-42c1-95e5-08c4b8c579e3'
    },
    data: {}
})

const instanceNews = axios.create({

    baseURL: 'https://newsapi.org/v2/everything?' +
        'q=Apple&' ,
    data: {}
})


export  const newsAPI = {
    getPopularNews(){
        return instanceNews(`${currentDate}sortBy=popularity&apiKey=9dd1fd7346ed4627a47c7fcd16c93d98`)
            .then(response => {
                return response.data
            })
    }
}


export const usersAPI = {
    getUsers (currentPage, pageSize)  {
        return instance.get( `users?page=${currentPage}&count= ${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(id){
        return instance.delete( `follow/${id}`)
    },
    follow(id){
        return instance.post( `follow/${id}`)
     },
    getProfile(id){
        console.warn('method')
        return profileAPI.getProfile(id)
    }
}

export const profileAPI = {
    getProfile(id){
        return instance.get( `profile/${id}`)
    },
    getStatus(id){
        return instance.get( `profile/status/${id}`)
    },
    updateStatus(status){
        return instance.put( `profile/status`, {status: status})
    },
    savePhoto(photoFile){
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put( `profile/photo`, formData, {headers: {
            'Content-Type': 'multipart/form-data'
            }})
    }
}


export const authAPI = {
   me(){
       return instance.get(`auth/me`)
   },
    login(email, password, rememberMe=false){
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    logout(){
        return instance.delete(`auth/login`)
    }


}

export const securityAPI = {
    getCaptchaUrl(){
        return instance.get(`security/get-captcha-url`)
    }


}
