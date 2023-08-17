import axios from "axios";

const instance=axios.create({
    withCredentials:true,
    baseURL:`https://todo-manager-swart.onrender.com/api`
})

export default instance