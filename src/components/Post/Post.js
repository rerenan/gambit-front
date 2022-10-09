import styled from "styled-components"

import Avatar from '@mui/material/Avatar';

export default function Post({id, username, profileImage, text}){
    
    
    return (
        <Container key={id}>
            <TopBox>
                <Avatar src={profileImage}/>
                <h2>{username}</h2>
            </TopBox>
                
            
            <h3>{text}</h3>
        </Container>
    )
}

const Container = styled.div`
    width: 700px;
    min-height: 100px;
    border-bottom: #4A5568 solid 0.2px;
    background-color: #131720;
    color: white;
    padding: 30px;
    h2{
        margin-left: 15px;
    }
    h3{
        margin-top: 30px;
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