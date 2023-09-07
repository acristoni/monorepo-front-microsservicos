import { User } from "interfaces/user.interface";

export default async function getUsers(setUserList: (value: User[]) => void) {
    const res = await fetch(`${process.env.URL_FRONT}/api/user`)   
    const resJson = await res.json();
    setUserList( JSON.parse(resJson.data) )
    return
}