
import { useState } from "react"
import styled from "styled-components"
import CreatePost from "../../components/CreatePost/CreatePost";
import Header from "../../components/Header"


export default function Home() {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    

    
    
    return(
        <>
        <Header/>
        <Content>
            <CreatePost token={token}/>
            <PostsBox>

            </PostsBox>
        </Content>
        </>
    )
};

const Content = styled.div`
    padding-top: 55px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PostsBox = styled.div``