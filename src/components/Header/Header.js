import styled from "styled-components"

export default function Header() {
    return (
        <Container>
        <h1>Gambit</h1>
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
    background-color: grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;

    h1{
        font-size: 27px;
    }

`