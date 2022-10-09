import styled from "styled-components"
import { FilledInput } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import axios from "axios";

export default function CreatePost({token, getPosts, username, profileImage}) {
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(true);
    const { register, handleSubmit } = useForm();
    
    async function send(data){
       
        const config = {
            headers: {
                Authorization: `${token}`
            }
        }
        try{
            await axios.post(`
                ${process.env.REACT_APP_API_BASE_URL}/posts/create`,
                data,
                config
            );
            
            setText("");
            getPosts();

        }catch(e){
            alert(e.message)
        }
    }

    function handleTextOnChange(e){
        setText(e.target.value);
        if(e.target.value === "") {
            setDisabled(true)
        }else {
            setDisabled(false);
        }
    }

    return (
        <Container>
            <Avatar className="avatar" src={profileImage} />
            <form onSubmit={handleSubmit(send)}>
            <FormControl fullWidth>
            <FilledInput 
                className="input-text" 
                {...register("text", {required: true})}
                placeholder="Share Your EXP"  
                multiline
                value={text}
                onChange={handleTextOnChange}
            />
            </FormControl>
            <IconButton disabled={disabled}  type="submit" className="sendButton"><SendRoundedIcon/></IconButton>
            </form>
        </Container>
    )
}

const Container = styled.div`
    width: 720px;;
    padding: 30px;
    padding-right: 65px;
    display: flex;
    position: relative;
    border-bottom: #4A5568 solid 1px;
    border-left: #4A5568 solid 1px;
    border-right: #4A5568 solid 1px;
    background-color: #131720;
    .input-text {
        color: white;
        margin-left: 10px;
    }
    .avatar {
        margin-top: 15px;
        width: 50px;
        height: 50px;
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


