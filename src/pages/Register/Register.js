import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function signUp(e){
    e.preventDefault()
    try {
    const user = {
      username,
      email,
      password,
      confirmPassword
    }

    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, user);
    
    navigate("/login");

    } catch (error) {
      alert(error)
    }
  } 

  return (
    <Content>
      <LeftContainer>
        <form onSubmit={signUp}>
        <input
            type="text"
            placeholder="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
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
            type="password"
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