import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header"
import UserContext from "../../contexts/userContext";
import { Avatar, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import EditProfile from "../../components/EditProfile";


export default function User(){
    const {user, token} = useContext(UserContext);
    const {username: pageUsername} = useParams();
    const [profileData, setProfileData] = useState({
      "id": "",
      "userId": "",
      "profilePicture": null,
      "biography": null,
      "banner": null,
      "followers": []
    });
    const [posts, setPosts] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect( ()=>{
       getProfile()
    },[pageUsername])
    useEffect( ()=>{
      getPosts()
   },[profileData])

    async function getProfile() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/profile/${pageUsername}`);
        setProfileData(response.data);
        getPosts()
      } catch (e) {
        console.log(e);
      }
    }

    async function getPosts() {
      if(profileData.userId){
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/posts/${profileData.userId}`
        );
        setPosts(response.data);
      } catch (e) {
        alert(e);
        console.log(e);
      }
    }
    }
    async function follow(){
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/follow/${profileData.userId}`,"",config);
        setLoading(false);
        getProfile();
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    }

    async function unfollow(){
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/unfollow/${profileData.userId}`,config);
        setLoading(false);
        getProfile()
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    }
    function renderPosts() {
      return posts.map(({ id, userId, username, profileImage, text }) => (
        <Post
          key={id}
          userId={userId}
          username={username}
          profileImage={profileImage}
          text={text}
        />
      ));
    }

    function isOwnerPage(){
      if(user.id === profileData.userId){
        return (
          <Button 
            variant="outlined" 
            className="button edit" 
            onClick={()=>setOpen(true)}
          >
            Edit Perfil
          </Button>
        )
      }else if(profileData.followers.includes(user.id)){
        return (
          <Button 
          variant="outlined" 
          className="button follow" 
          size="medium"
          onClick={()=> unfollow()}
          disabled={loading}
          >
            Unfollow
          </Button>
        )
      }else {
        return (
          <Button 
          variant="contained" 
          className="button follow" 
          size="medium"
          onClick={()=> follow()}
          disabled={loading}
          >
            Follow
          </Button>
        )
      }
    }
    return (
        <>
        <Header  logged={!!token} user={user} getProfile={getProfile}/>
        <Content>
            <BannerBox>
            <img className="banner" src={profileData.banner} alt="" />
            <ProfileBox>
            <Avatar src={profileData.profilePicture}/>
            <h1>{pageUsername}</h1>
            </ProfileBox>
            </BannerBox>
            <DescriptionBox>
            {isOwnerPage()}
            </DescriptionBox>
            {posts? renderPosts() : ""}
            <EditProfile open={open} setOpen={setOpen} profileData={profileData} getProfile={getProfile}/>
        </Content>
        </>
    )
}

const Content = styled.div`
  padding-top: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`
const BannerBox = styled.div`
    width: 100%;
    .banner{
    width: 100%;
    height: 300px;
    object-fit: cover;
    
  }
`
const DescriptionBox = styled.div`
      width: 720px;
      height: 200px;
      border-bottom: #4A5568 solid 1px;
      background-color: #131720;
      padding: 30px;
      position: relative;
      .button{
        position: absolute;
        right: 0px;
      }
      .follow{
        border-radius: 10px;
        text-transform: none;
        font-size: 18px;
      }
`
const ProfileBox = styled.div`
  position: absolute;
  left: 25%;
  top: 275px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  h1{
    font-size: 28px;
    font-weight: 700;
  }
  div{
    border: 3px solid #141414;
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 1280px) {
    left: 120px
  }
`