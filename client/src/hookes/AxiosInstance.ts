import axios from "axios";

const instance=axios.create({
    withCredentials:true,
    baseURL:`https://todo-manager-seven.vercel.app/api`
})

export default instance