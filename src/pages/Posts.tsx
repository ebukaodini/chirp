import { useState } from "react";
import { useHistory } from "react-router";
import NameIcon from "../components/name-icon";
import './Posts.scss';
import PostInterface from "../types/post";
import UserInterface from "../types/user";
import LoggedInUserInterface from "../types/logged-in-user";
import Post from "../components/post";
import { UserPlus } from "react-feather";
import { posts as PostData } from "../store/posts";
import { users } from "../store/users";
// import { TopicInterface } from "../types/topic";
// import { topics } from "../store/topics";
import FriendInterface from "../types/user";
import axios from "axios";
import { Link } from "react-router-dom";

interface PostState {
  username: string
}

export default function Posts() {

  const history = useHistory<PostState>();

  const [recommendedFriends, setRecommendedFriends] = useState<Array<FriendInterface>>([]);

  // const [recommendedTopics] = useState<Array<TopicInterface>>([]);

  const [posts, updatePosts] = useState(PostData);

  const handleUpdatePost = async (newPost: PostInterface) => {
    let index = posts.findIndex((post) => post.id === newPost.id)
    posts.splice(index, 1, newPost)
    updatePosts([...posts]);
    await recommendFriendsAndTopics();
  }

  const defaultUser: LoggedInUserInterface = {
    username: history.location.state.username,
    friendsFollowing: [],
    topicsFollowing: []
  }

  const [user, updateUser] = useState(defaultUser);

  const updateUserFriendsFollowing = async (friend: UserInterface) => {
    let index = user.friendsFollowing.findIndex((user) => user === friend.name)
    if (index > -1) {
      user.friendsFollowing.splice(index, 1);
    } else {
      user.friendsFollowing.push(friend.name);
    }
    updateUser({ ...user });
    await recommendFriendsAndTopics();
  }

  // const updateUserTopicsFollowing = async (topic: TopicInterface) => {
  //   let index = user.topicsFollowing.findIndex((user) => user === topic)
  //   if (index > -1) {
  //     user.topicsFollowing.splice(index, 1);
  //   } else {
  //     user.topicsFollowing.push(topic);
  //   }
  //   updateUser({ ...user });
  //   await recommendFriendsAndTopics();
  // }

  const recommendFriendsAndTopics = async () => {
    // setRecommendedFriends([...newFriendsRecommendation]);
    // setRecommendedTopics([...newTopicsRecommendation]);

    await recommendFriends();
  }

  const recommendFriends = async () => {
    let data_pool: any = [];
    users.forEach((user: UserInterface) => {
      data_pool.push({ id: user.id, tags: user.topics });
    });
    let interest_score: any = [];
    posts.forEach((post: PostInterface) => {
      interest_score.push({ id: post.id, score: post.claps });
    });
    let current_data: any = [];
    posts.forEach((post: PostInterface) => {
      current_data.push({ id: post.id, tags: post.tags });
    });

    let reqData = {
      current_data,
      interest_score,
      data_pool,
      number_of_recommendations: 5
    }

    let resp = await axios.post(
      'https://cors-everywhere.herokuapp.com/https://chirp-litmus-api.herokuapp.com/', reqData
    );

    if (resp.data.status === 'success') {
      let recommendedUserIds: string[] = resp.data.data;

      console.log(recommendedUserIds);
      let newFriendsRecommendation: UserInterface[] = [];

      recommendedUserIds.forEach((id: string) => {
        let recommendedFriend = users.find((user: UserInterface) => user.id === parseInt(id))
        if (recommendedFriend !== undefined)
          newFriendsRecommendation.push(recommendedFriend)
      })

      setRecommendedFriends([...newFriendsRecommendation]);

    }
  }

  // const recommendTopics = async () => { }

  return (
    <>

      <div className='h-100 w-100 bg-light'>

        <header className='__header py-3 w-100 bg-white shadow-sm d-flex'>
          <div className='container d-flex align-items-center justify-content-between'>
            <h1 className='text-primary'>
              <Link to='/' className='text-decoration-none'>Chirp.</Link>
            </h1>
            <NameIcon username={user.username} />
          </div>
        </header>

        <main className='container'>

          <div className='row'>

            <section className='__posts col-lg-8 col-md-8 col-12 order-md-first order-last py-4'>

              <h1 className='text-dark mb-4'>Posts</h1>

              {posts.map((post: PostInterface) => (
                <Post key={post.id} post={post} update={handleUpdatePost} />
              ))}

            </section>

            <section className='__recommendation-container col-lg-4 col-md-4 col-12 py-4 border-start'>
              <h3 className='text-dark'>Recommended Friends</h3>
              <div className='__recommended_friends'>
                {
                  recommendedFriends.length > 0 ?
                    recommendedFriends.map((usr) => (
                      <div key={usr.id} className='border p-3 shadow-sm mb-4 w-100 d-flex flex-column'>
                        <div className='d-flex justify-content-between align-items-between mb-3'>
                          <NameIcon username={usr.name} />
                          <div className='fw-bold'>@{usr.name}</div>
                        </div>

                        <div className='__post_tags mb-3 d-flex flex-wrap'>
                          {usr.topics.map((tag, index) => (
                            <span key={index} className='__topic me-2'>#{tag.replace(/ /g, '-')}</span>
                          ))}
                        </div>

                        <button onClick={() => updateUserFriendsFollowing(usr)} className='btn btn-sm btn-primary d-flex align-items-center align-self-end'>
                          <UserPlus size={15} />
                          {
                            user.friendsFollowing.includes(usr.name) ?
                              <span className='ms-2'>Following</span> :
                              <span className='ms-2'>Follow</span>
                          }
                        </button>
                      </div>
                    )) :
                    <div className='py-3'>
                      No recommended friend. <br />
                      Interact with the posts to get suggestions.
                    </div>
                }
              </div>

              {/* <h3 className='text-dark'>Recommended Topics</h3>
              <div className='__recommended_topics'>
                {
                  recommendedTopics.length > 0 ?
                    recommendedTopics.map((topic) => (
                      <div key={topic} className='border p-3 shadow-sm mb-4 w-100 d-flex flex-column'>
                        <div className='d-flex justify-content-between align-items-between'>
                          <div className='fw-bold'>{topic.replace(/ /g, '-')}</div>

                          <button onClick={() => updateUserTopicsFollowing(topic)} className='btn btn-sm btn-primary d-flex align-items-center align-self-end'>
                            <UserPlus size={15} />
                            {
                              user.topicsFollowing.includes(topic) ?
                                <span className='ms-2'>Following</span> :
                                <span className='ms-2'>Follow</span>
                            }
                          </button>
                        </div>


                      </div>
                    )) :
                    <div className='py-3'>
                      No recommended topic
                    </div>
                }
              </div> */}

            </section>

          </div>

        </main>

      </div>

    </>
  );
}
