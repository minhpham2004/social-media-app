import React from 'react'
import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
import { useSelector } from 'react-redux'
import LoadingIcon from '../images/loading.gif'

function Home() {
  const { homePosts } = useSelector(state => state)
  return (
    <div className='home row mx-0'>
      <div className='col-md-8'>
        <Status />

        {
          homePosts.loading
            ? <img src={LoadingIcon} alt="loading" className='d-block mx-auto' />
            : homePosts.result === 0
              ? <h2 className='text-center'>No Post</h2>
              : <Posts />
        }

      </div>
      <div className='col-md-4'></div>
    </div>
  )
}

export default Home