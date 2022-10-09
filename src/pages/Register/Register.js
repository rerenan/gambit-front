import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import styled from "styled-components";
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
import { handleValidateEmail } from "../../utils/emailValidator";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setpassword] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [confirmPassword, setConfirmPassword] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const navigate = useNavigate();

  password.current = watch("password", "");

  async function signUp(data) {
    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/register`,
        data
      );
      setLoading(false)
      navigate("/login");
    } catch (error) {
      setLoading(false)
      console.log(error);
      alert(error.response.data);
    }
  }


  const handleChangePassword = (prop) => (event) => {
    setpassword({ ...password, [prop]: event.target.value });
  };

  const handleChangeConfirmPassword = (prop) => (event) => {
    setConfirmPassword({ ...confirmPassword, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setpassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setConfirmPassword({
      ...confirmPassword,
      showPassword: !confirmPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Content>
      <LeftContainer>
        <form onSubmit={handleSubmit(signUp)}>
        <FormControl error={!!errors.username} fullWidth margin="dense">
        <InputLabel>
            Username
          </InputLabel>
          <OutlinedInput
            id="outlined-username"
            {...register("username", {required: true})}
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <FormHelperText error>{errors.username?.type === 'required' && <p role="alert">First name is required</p>}</FormHelperText>
        </FormControl>
        <FormControl error={!!errors.email} fullWidth margin="dense">
        <InputLabel>
            Email
          </InputLabel>
          <OutlinedInput
            id="outlined-email"
            {...register(
              "email",
              {required: true, validate: handleValidateEmail})}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <FormHelperText error>{errors.email?.type === 'required' && <p role="alert">Email is required</p>}</FormHelperText>
          <FormHelperText error>{errors.email?.type === 'validate' && <p role="alert">Email invalid!</p>}</FormHelperText>
        </FormControl>
        <FormControl error={!!errors.password} fullWidth margin="dense">
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
        <FormControl error={!!errors.confirmPassword} fullWidth margin="dense">
          <InputLabel>
            Confirm Your Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={confirmPassword.showPassword ? "text" : "password"}
            value={confirmPassword.password}
            {...register("confirmPassword", {required: true, validate: value =>
              value === password.current})}
            onChange={handleChangeConfirmPassword("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {confirmPassword.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm your Password"
            disabled={loading}
          />
          <FormHelperText error>{errors.confirmPassword?.type === 'required' && <p role="alert">Confirm password is required</p>}</FormHelperText>
          <FormHelperText error>{errors.confirmPassword?.type === 'validate' && <p role="alert">Passwords don't match!</p>}</FormHelperText>
        </FormControl>
        <LoadingButton 
          className="register-button"
          variant="contained" 
          type="submit"
          loading={loading}
          >
            Register
          </LoadingButton>
          <h5>Already have an account? <Link to="/login">Sign in!</Link></h5>
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
  color: black;
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
    display: flex;
    flex-direction: column;
    padding: 0px 30px;
    align-items: center;
    margin-bottom: 125px;
  }
  .register-button{
    margin-top: 30px;
    margin-bottom: 15px;
    width: 100%;
    height: 50px;
  }
`;
const RightContainer = styled.div`
  width: 100%;
  height: 100%;
`;
