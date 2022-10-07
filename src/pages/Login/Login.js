import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function signIn(e) {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/`,
        user
      );
      localStorage.setItem("authToken",response.data.token)

      navigate("/");

    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  }

  return (
    <Content>
      <LeftContainer>
        <form onSubmit={signIn}>
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <h6 onClick={() => navigate("/register")}>New here? Create account!</h6>
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
  h6 {
    cursor: pointer;
  }
`;
const RightContainer = styled.div`
  width: auto;
  height: 100%;
  background-color: black;
`;
