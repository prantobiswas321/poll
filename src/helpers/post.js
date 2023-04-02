import axios from "axios";
import { rootUrl } from "../constants/constants";

async function post(url, body = {}) {
    try {
        const res = await axios.post(`${rootUrl}${url}`, body);
        return await res;
    } catch (error) {

        throw error;
    }
}

export default post;
