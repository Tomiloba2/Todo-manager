import axios from "axios";

const instance=axios.create({
    withCredentials:true,
    baseURL:"http://localhost:2020/api/"
})

export default instance