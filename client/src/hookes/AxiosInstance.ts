import axios from "axios";

const instance=axios.create({
    withCredentials:true,
    baseURL:`http://localhost:2000/api/`
})

export default instance