import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  return (
    <Content>
      <LeftContainer>
        <form onSubmit={() => {}}>
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
          <button type="submit">Register</button>
        </form>
        <h6 onClick={()=> navigate("/login")}>Already have an account?</h6>
      </LeftContainer>
      <RightContainer></RightContainer>
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
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h6{
    cursor: pointer;
  }
`;
const RightContainer = styled.div`
  width: auto;
  height: 100%;
  background-color: black;
`;

export default Register;