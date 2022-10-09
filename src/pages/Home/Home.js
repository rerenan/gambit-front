import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CreatePost from "../../components/CreatePost/CreatePost";
import Header from "../../components/Header";
import Post from "../../components/Post/Post";

export default function Home() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [posts, setPosts] = useState("");
  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/posts`,
        config
      );
      setPosts(response.data);
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }
  function renderPosts() {
    return posts.map(({ userId, username, profileImage, text }, index) => (
      <Post
        key={index}
        userId={userId}
        username={username}
        profileImage={profileImage}
        text={text}
      />
    ));
  }

  return (
    <>
      <Header />
      <Content>
        <CreatePost token={token} getPosts={getPosts}/>
        <PostsBox>{posts? renderPosts() : ""}</PostsBox>
      </Content>
    </>
  );
}

const Content = styled.div`
  padding-top: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostsBox = styled.div``;
