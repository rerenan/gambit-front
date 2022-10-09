import { useNavigate } from "react-router-dom";

import styled from "styled-components"
import Avatar from '@mui/material/Avatar';

export default function Post({id, username, profileImage, text}){
    const navigate = useNavigate();
    console.log(text)
    return (
        <Container key={id}>
            <TopBox>
                <UserProfile onClick={()=> navigate(`/${username}`)}>
                    <Avatar src={profileImage}/>
                    <h2>{username}</h2>
                </UserProfile>
            </TopBox>
            
            <h3>{text}</h3>
        </Container>
    )
}

const Container = styled.div`
    width: 720px;
    min-height: 100px;
    border-bottom: #4A5568 solid 1px;
    border-left: #4A5568 solid 1px;
    border-right: #4A5568 solid 1px;
    background-color: #131720;
    padding: 30px;
    word-wrap: break-word;
    h2{
        margin-left: 15px;
        font-size: 19px;
        font-weight: 500;
    }
    h3{
        margin-top: 30px;
        font-size: 16px;
        white-space: pre-wrap;
    }
    
`
const TopBox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    div{
        width: 50px;
        height: 50px;
    }

`
const UserProfile = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`