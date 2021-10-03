import { ThumbsUp } from "react-feather";
import PostInterface from "../types/post";
import './post.scss';


type postProp = {
  post: PostInterface,
  update: CallableFunction
}

export default function Post({ post, update }: postProp) {

  const toggleLiked = () => {
    post.like = !post.like;
    update(post);
  }

  const handleClap = () => {
    post.claps = post.claps < 50 ? post.claps + 1 : post.claps
    update(post);
  }


  return (
    <div className='__post bor der bg-white shadow-sm mb-4 p-3'>

      <div className='__post_tags mb-3 d-flex flex-wrap'>
        {post.tags.map((tag, index) => (
          <span key={index} className='__tag me-2'>#{tag.replace(/ /g, '-')}</span>
        ))}
      </div>

      <p>
        {post.content}
      </p>

      <div className='__reactions d-flex justify-content-between'>

        <button onClick={toggleLiked} className={`btn btn-sm ${post.like ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}>
          <ThumbsUp size={15} /> <span className='ms-1'>Like</span>
        </button>

        <button onClick={handleClap} className={`btn btn-sm btn-primary`}>
          <span className='px-4'>Clap {post.claps}</span>
        </button>

      </div>

    </div>
  )
}
