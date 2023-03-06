import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard'

function Posts() {
  const { homePosts } = useSelector(state => state)
  return (
    <div className='posts'>
      {
        homePosts.posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))
      }
    </div>
  )
}

export default Posts