import styled from "styled-components";
import { useState } from "react";

function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    return (
    <Content>
      <LeftContainer>
      <form onSubmit={()=>{}}>
        <input
            type="email" 
            placeholder="e-mail"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
        />
        <input
            type="text"
            placeholder="username"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
        />
        <input
            type="text"
            placeholder="confirm your password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
          <button type="submit">
            Register
          </button>
        </form>
      </LeftContainer>
      <RightContainer>

      </RightContainer>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
const LeftContainer = styled.div`
  width: 600px;
  height: 100%;
  padding: 40px;
  background-color: white;
  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const RightContainer = styled.div`
  width: auto;
  height: 100%;
  background-color: black;
`;


export default Register;