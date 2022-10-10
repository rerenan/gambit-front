import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header"
import UserContext from "../../contexts/userContext";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import defaultBanner from "../../assets/images/banner.jpg"
import Post from "../../components/Post/Post";


export default function User(){
    const {user, token} = useContext(UserContext);
    const {username: pageUsername} = useParams();
    const [profileData, setProfileData] = useState("");
    const [posts, setPosts] = useState("");
    
    useEffect( ()=>{
       getProfile()
    },[])
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

   

    return (
        <>
        <Header  logged={!!token} user={user}/>
        <Content>
            <BannerBox>
            <img className="banner" src={profileData.banner? profileData.banner: defaultBanner} alt="" />
            <ProfileBox>
            <Avatar src={profileData.profilePicture}/>
            <h1>{pageUsername}</h1>
            </ProfileBox>
            </BannerBox>
            <DescriptionBox>

            </DescriptionBox>
            {posts? renderPosts() : ""}
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
      background-color: green;
`
const ProfileBox = styled.div`
  position: absolute;
  left: 150px;
  top: 275px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`