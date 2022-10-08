import styled from "styled-components"
import { FilledInput } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from "@mui/material/FormControl";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function CreatePost() {
    return (
        <Container>
            <Avatar className="avatar" src="/broken-image.jpg" />
            <form action="">
            <FormControl fullWidth>
            <FilledInput className="input-text" placeholder="Share Your EXP" color="white" multiline />
            </FormControl>
            <SendRoundedIcon className="sendButton"/>
            </form>
        </Container>
    )
}

const Container = styled.div`
    width: 720px;;
    padding: 20px;
    padding-right: 50px;
    display: flex;
    position: relative;
    .input-text {
        color: white;
        margin-left: 10px;
    }
    .avatar {
        margin-top: 15px;
    }
    form{
        display: flex;
        width: 100%;
        height: auto;
    }
    .sendButton {
        color: white;
        position: absolute;
        right: 20px;
        bottom: 30px;
    }
`


