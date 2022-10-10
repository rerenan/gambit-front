import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';


export default function EditProfile({open, setOpen, profileData, setProfileData}){
    return(
        
        <Dialog  open={open} onClose={()=>setOpen(false)} sx={{
            "& .MuiDialogActions-root":{
                padding: "12px 20px"
            },
            "& .MuiDialogContent-root":{
                padding: "20px"
            }
        }}> 
        <DialogTitle sx={{position: "relative"}} >
      Edit Profile
        <IconButton
          aria-label="close"
          onClick={()=>setOpen(false)}
          sx={{
                position: "absolute",
                zIndex: 10,
                right: 10,
                top: 8,
                width:40,
                height:40
          }}
        >
          <CloseIcon />
        </IconButton>
      
    </DialogTitle>
        <DialogContent sx={{
            "& .MuiIconButton-root":{
                position: "absolute",
                left: "49%",
                top: "45%",
            }
        }}>
        <Form>
        <Banner>
        <img
            className='image'
            style={{ maxWidth: "100%", maxHeight: "100vh", objectFit: "cover" }}
            src={profileData.banner}
            alt=""
        /><IconButton className='icon-button' color="primary" aria-label="upload picture" component="label" sx={{
            position: "absolute",
                left: "49%",
                top: "45%",
        }}>
        <input hidden accept="image/*" type="file" />
        <PhotoCamera  sx={{scale: "2.6", color:"black"}}/>
      </IconButton>
      </Banner>
      <ProfilePhoto>
      <Avatar
            className='profile-image'
            src={profileData.profilePicture}
            alt=""
        />
        <IconButton className='icon-button' color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera  sx={{scale: "1.5", color:"black",}}/>
      </IconButton>
    </ProfilePhoto>
        <InputBox>
        
        <TextField fullWidth label="Bio" />
        </InputBox>
        </Form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      
    )
}

const Banner = styled.div`
    position: relative;
    :hover{
        filter: brightness(0.6);
    }
`
const ProfilePhoto = styled.div`
    position: relative;
    width: 133px;
    .profile-image{
        position: absolute;
        border: white 5px solid;
        width: 120px;
        height: 120px;
        top: -50px;
        left: 25px;
    }
    :hover{
        filter: brightness(0.6);
    }
    
`
const Form = styled.form`
    width: 100%;
`
const InputBox = styled.div`
    margin-top: 80px;
`