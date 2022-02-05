import { v4 as uuidv4 } from 'uuid';
export const getToken=()=>{
    if(localStorage.getItem('uuid')){
        let uuid_token=localStorage.getItem('uuid');
        return uuid_token
    }else{
        uuid_token=localStorage.setItem('uuid', uuidv4());
        return uuid_token
    }
}