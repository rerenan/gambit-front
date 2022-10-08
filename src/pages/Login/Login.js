import { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from '@mui/lab/LoadingButton';
import imageTest from "../../assets/images/test.webp"



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

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
  const handleChangePassword = (prop) => (event) => {
    setpassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setpassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Content>
      <LeftContainer>
        <form onSubmit={signIn}>
        <FormControl error={!!errors.email} fullWidth>
        <InputLabel>
            Email
          </InputLabel>
          <OutlinedInput
            id="outlined-email"
            {...register(
              "email",
              {required: true})}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <FormHelperText error>{errors.email?.type === 'required' && <p role="alert">Email is required</p>}</FormHelperText>
          <FormHelperText error>{errors.email?.type === 'validate' && <p role="alert">Email invalid!</p>}</FormHelperText>
        </FormControl>
        <FormControl error={!!errors.password} fullWidth>
          <InputLabel>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={password.showPassword ? "text" : "password"}
            value={password.password}
            {...register("password", {required: true})}
            onChange={handleChangePassword("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {password.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            disabled={loading}
          />
          <FormHelperText error>{errors.password?.type === 'required' && <p role="alert">Password is required</p>}</FormHelperText>
        </FormControl>
        <LoadingButton 
          className="register-button"
          variant="contained" 
          type="submit"
          loading={loading}
          >
            Register
          </LoadingButton>
        
        <Link to="/register">Don’t have an account? Sign Up</Link>
        </form>
      </LeftContainer>
      <RightContainer style={{ backgroundImage: `url(${imageTest})` }}></RightContainer>
    </Content>
  );
}
const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  p{
    color: red;
  }
`;
const LeftContainer = styled.div`
  width: 600px;
  height: 100%;
  padding: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  h6 {
    cursor: pointer;
  }
  form{
    width: 100%;
    height:250px;
    display: flex;
    flex-direction: column;
    padding: 0px 30px;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 250px;
  }
  .register-button{
    margin-top: 35px;
    margin-bottom: 15px;
    width: 100%;
    height: 50px;
  }
`;
const RightContainer = styled.div`
  width: 100%;
  height: 100%;
`;
