import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser} from "../interfaces/IUser";

export default class UserService {
    static async getAll ():Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/user/getall')
    }

}