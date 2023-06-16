import React, { useState, useEffect } from 'react'
import PostThumb from '../PostThumb'

function Posts({ auth, id, dispatch, profile }) {
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)

  useEffect(() => {
    profile.userPosts.forEach(data => {
      if (data._id === id) {
        setPosts(data.posts)
        setResult(data.result)
      }
    })
  }, [profile.userPosts, id])


  return (
    <div>
      <PostThumb posts={posts} result={result} />
    </div>
  )
}

export default Posts