import { questionInit } from "./initQuestion"
import { userInit } from "./initUser"

export const initQuizz = {
    _id: "",
    idUser: "",
    title: "",
    description: "",
    urlThumbnail: "",
    idCollection: "",
    keyword: "",
    play: 0,
    share: 0,
    question: questionInit,
}


export const initQuizzOption2 = {
    user: userInit,
    _id: "",
    idUser: "",
    title: "",
    description: "",
    urlThumbnail: "",
    idCollection: {
        _id:"",
        title:"",
    },
    keyword: "",
    play: 0,
    share: 0,
    question: questionInit,
    updatedAt: "",
    createdAt: "",
}

