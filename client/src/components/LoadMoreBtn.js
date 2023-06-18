import React from 'react'

function LoadMoreBtn({ result, page, load, handleLoadMore }) {
    return (
        <>
            {
                result < 9 * (page - 1)
                    ? ''
                    : !load && <button className='btn btn-dark d-block mx-auto' onClick={handleLoadMore}>Load More</button>
            }

        </>
    )
}

export default LoadMoreBtn