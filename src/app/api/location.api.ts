import axios from "axios";

export const getAllLocations = () => {
    return axios.get(
        `http://localhost:8080/api/location/get_all_locations`
    )
}