import Axios from 'axios'
import { rootUrl } from '../constants/constants'

async function get(url) {
    try {
        const res = await Axios.get(`${rootUrl}${url}`)
        return await res?.data
    }
    catch (error) {
        throw error
    }
}

export default get