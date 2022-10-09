import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import styled from "styled-components"

export default function Header({logged}) {
    const navigate = useNavigate();
    function renderButtons(){
        if(logged){

        }else{
            return(
                <Stack spacing={2} direction="row">
                    <Button variant="outlined" onClick={()=> navigate("/login")}>LOG IN</Button>
                    <Button variant="contained"onClick={()=> navigate("/register")}>SIGN UP</Button>
                </Stack>
            )
        }
    }
    
    
    return (
        <Container>
        <h1>Gambit</h1>
        {renderButtons()}
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background-color: #434E62;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;

    h1{
        font-size: 27px;
    }

`