import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

import * as filestack from 'filestack-js';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/userContext";

const client = filestack.init(`${process.env.REACT_APP_API_FILESTACK_KEY}`);

export default function EditProfile({
  open,
  setOpen,
  profileData,
  getProfile,
}) {
    
    const [progress, setProgress] = useState(0);
    const [bannerFile, setBannerFile] = useState("");
    const [profilePhotoFile, setProfilePhotoFile] = useState("")
    const [updatedProfile, setUpdatedProfile] = useState({});
    
    const [banner, setBanner] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const {token} = useContext(UserContext);
    

    useEffect(()=>{
        setBanner(profileData.banner)
        setProfilePhoto(profileData.profilePicture)
    },[open])

    async function sendProfile(e){
        e.preventDefault()
       
            try {
                if(profilePhotoFile){
                    const response = await client.upload(profilePhotoFile)
                    await setUpdatedProfile({...updatedProfile, profilePicture: response.url})
                    await uploadProfile()
                    
                    
                }
                if(bannerFile){
                    const response =  await client.upload(bannerFile)
                    await setUpdatedProfile({...updatedProfile, banner: response.url})   
                    await uploadProfile()
      
                }
                
            } catch (error) {
                console.log(error)
            }     
            
    }

    async function uploadProfile(){
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/profile/${profileData.id}`, updatedProfile ,config);
            getProfile();
            setOpen(false);
        } catch (err) {
            console.log(err)
        }
    }

    function handleBannerData(e){
        const file = e.target.files[0]
        setBannerFile(file)
        setBanner(URL.createObjectURL(file));
    }

    function handleProfilePhotoData(e){
        const file = e.target.files[0]
        setProfilePhotoFile(file)
        setProfilePhoto(URL.createObjectURL(file));
    }
  
    return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDialogActions-root": {
          padding: "12px 20px",
        },
        "& .MuiDialogContent-root": {
          padding: "20px",
        },
      }}
    >
        <Form onSubmit={sendProfile}>
      <DialogTitle sx={{ position: "relative"}}>
        Edit Profile
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            zIndex: 10,
            right: 10,
            top: 8,
            width: 40,
            height: 40,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          "& .MuiIconButton-root": {
            position: "absolute",
            left: "49%",
            top: "45%",
          },
        }}
      >
        
          <Banner>
            <img
              className="image"
            
              src={banner}
              alt=""
            />
            <IconButton
              className="icon-button"
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{
                position: "absolute",
                left: "49%",
                top: "45%",
              }}
            >
              <input hidden accept="image/*" type="file"  onChange={handleBannerData}/>
              <PhotoCamera sx={{ scale: "2.6", color: "black" }} />
            </IconButton>
          </Banner>
          <ProfilePhoto>
            <Avatar
              className="profile-image"
              src={profilePhoto}
              alt=""
            />
            <IconButton
              className="icon-button"
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" onChange={handleProfilePhotoData}/>
              <PhotoCamera sx={{ scale: "1.5", color: "black" }} />
            </IconButton>
          </ProfilePhoto>
          <InputBox>
            <TextField fullWidth label="Bio" />
          </InputBox>
       
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit">Save</Button>
      </DialogActions>
      </Form>
    </Dialog>
  );
}

const Banner = styled.div`
  position: relative;
  :hover {
    filter: brightness(0.6);
  }
  img{
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;
const ProfilePhoto = styled.div`
  position: relative;
  width: 133px;
  .profile-image {
    position: absolute;
    border: white 5px solid;
    width: 120px;
    height: 120px;
    top: -50px;
    left: 25px;
  }
  :hover {
    filter: brightness(0.6);
  }
`;
const Form = styled.form`
  width: 100%;
`;
const InputBox = styled.div`
  margin-top: 80px;
`;
