import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import moment from 'moment'
import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu'
import { updateComment } from '../../../redux/actions/commentAction'

function CommentCard({ comment, post }) {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)

    const [isLike, setIsLike] = useState(false)
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        setContent(comment.content)
    }, [comment])

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    const handleLike = () => {

    }

    const handleUnLike = () => {

    }

    const handleUpdate = () => {
        if (comment.content !== content) {
            dispatch(updateComment({ comment, post, content, auth }))
            setOnEdit(false)
        } else {
            setOnEdit(false)
        }
    }

    return (
        <div className='comment_card mt-2' style={styleCard}>
            <Link to={`/profile/${comment.user._id}`} className='d-flex text-dark'>
                <Avatar src={comment.user.avatar || auth.user.avatar} size="small-avatar" />
                <h6 className='mx-1'>{comment.user.username}</h6>
            </Link>

            <div className='comment_content'>
                <div className='flex-fill'>
                    {
                        onEdit
                            ? <textarea rows="5" value={content} onChange={e => setContent(e.target.value)}></textarea>
                            : <div>
                                <span>
                                    {
                                        content.length < 100 ? content :
                                            readMore ? content + ' ' : content.slice(0, 100) + '...'
                                    }
                                </span>

                                {
                                    content.length > 100 &&
                                    <span className='readMore' onClick={() => setReadMore(!readMore)}>
                                        {readMore ? 'Hide content' : 'Show full'}
                                    </span>
                                }
                            </div>
                    }

                    <div>
                        <small className='text-muted mr-3'>
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className='font-weight-bold mr-3'>
                            {comment.likes.length} likes
                        </small>
                        {
                            onEdit
                                ? <>
                                    <small className='font-weight-bold mr-3' onClick={handleUpdate}>
                                        update
                                    </small>
                                    <small className='font-weight-bold mr-3' onClick={() => setOnEdit(false)}>
                                        cancel
                                    </small>
                                </>
                                : <small className='font-weight-bold mr-3'>
                                    reply
                                </small>
                        }

                    </div>
                </div>

                <div className='d-flex align-items-center mx-2' style={{ cursor: 'pointer' }}>
                    <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                </div>

            </div>
        </div>
    )
}

export default CommentCard