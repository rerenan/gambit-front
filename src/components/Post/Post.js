import styled from "styled-components"

import Avatar from '@mui/material/Avatar';

export default function Post({id, username, profileImage, text}){
    
    
    return (
        <Container key={id}>
            <Avatar src={profileImage}/>
            <h2>{username}</h2>
            <h3>{text}</h3>
        </Container>
    )
}

const Container = styled.div`
    width: 700px;
    background-color: #131720;
    color: white;

`