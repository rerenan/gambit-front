import axios from "axios";
import { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../../components/Header"


export default function Home() {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    
    console.log(token)


    
    return(
        <>
        <Header/>
        <Content>
            <PostsBox>

            </PostsBox>
        </Content>
        </>
    )
};

const Content = styled.div``

const PostsBox = styled.div``