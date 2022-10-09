import { useContext, useState } from "react";
import Header from "../../components/Header"
import UserContext from "../../contexts/userContext";

export default function User(){
    const {user, token} = useContext(UserContext);


    return (
        <   >
        <Header  logged={!!token} user={user}/>
        </>
    )
}