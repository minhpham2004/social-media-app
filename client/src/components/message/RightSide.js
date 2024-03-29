import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import UserCard from '../UserCard'
import MsgDisplay from './MsgDisplay'
import Icons from '../Icons'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { addMessage, getMessages } from '../../redux/actions/messageAction'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { imageUpload } from '../../utils/imageUpload'
import LoadIcon from '../../images/loading.gif'

function RightSide() {
    const { auth, message, theme, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [user, setUser] = useState([])
    const [text, setText] = useState('')
    const [media, setMedia] = useState([])
    const [loadMedia, setLoadMedia] = useState(false)

    const refDisplay = useRef()
    const pageEnd = useRef()

    const [page, setPage] = useState(0)

    useEffect(() => {
        const newUser = message.users.find(user => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
    }, [message.users, id])

    const handleChangeMedia = (e) => {
        const files = [...e.target.files]

        let err = ''
        let newMedia = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setMedia([...media, ...newMedia])
    }

    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!text.trim() && media.length === 0) return;
        setText('')
        setMedia([])
        setLoadMedia(true)

        let newArr = []
        if (media.length > 0) newArr = await imageUpload(media)

        const msg = {
            sender: auth.user._id,
            recipient: id,
            text,
            media: newArr,
            createdAt: new Date().toISOString()
        }

        setLoadMedia(false)
        dispatch(addMessage({ msg, auth, socket }))
    }

    useEffect(() => {
        dispatch(getMessages({ auth, id }))
    }, [id, dispatch, auth])


    useEffect(() => {
        if (message.data.every(item => item._id !== id)) {
            setTimeout(() => {
                refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
            }, 50)
        }
    }, [id, dispatch, auth, message.data])

    useEffect(() => {
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [text])

    //Load More
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(p => p + 1)
            }
        }, {
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    }, [setPage])

    useEffect(() => {
        if (message.resultData >= (page - 1) * 9 && page > 1) {
            dispatch(getMessages({ auth, id, page }))
        }
    }, [message.resultData, page, id, auth, dispatch])
  

    return (
        <>
            <div className='message_header'>
                {
                    user.length !== 0 &&
                    <UserCard user={user}>
                        <i className='fas fa-trash text-danger'></i>
                    </UserCard>
                }
            </div>

            <div
                className='chat_container'
                style={{ height: media.length > 0 ? 'calc(100% - 180px)' : '' }}
            >
                <div className='chat_display' ref={refDisplay}>
                    <button style={{ marginTop: '-25px' }} ref={pageEnd}>Load More</button>
                    {
                        message.data.map((msg, index) => (
                            <div key={index}>
                                {
                                    msg.sender !== auth.user._id &&
                                    <div className='chat_row other_message'>
                                        <MsgDisplay user={user} msg={msg} theme={theme} />
                                    </div>
                                }

                                {
                                    msg.sender === auth.user._id &&
                                    <div className='chat_row you_message'>
                                        <MsgDisplay user={auth.user} msg={msg} theme={theme} />
                                    </div>
                                }
                            </div>
                        ))
                    }

                    {
                        loadMedia &&
                        <div className='chat_row you_message'>
                            <img src={LoadIcon} alt='loading' />
                        </div>
                    }

                </div>
            </div>

            <div className='show_media' style={{ display: media.length > 0 ? 'grid' : 'none' }}>
                {
                    media.map((item, index) => (
                        <div key={index} id='file_media'>
                            {
                                item.type.match(/video/i)
                                    ? videoShow(URL.createObjectURL(item), theme)
                                    : imageShow(URL.createObjectURL(item), theme)
                            }
                            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
                        </div>
                    ))
                }
            </div>

            <form className='chat_input' onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter your message...'
                    value={text} onChange={e => setText(e.target.value)}
                    style={{
                        filter: theme ? 'invert(1)' : 'invert(0)',
                        background: theme ? '#040404' : '',
                        color: theme ? 'white' : ''
                    }}
                />

                <Icons setContent={setText} content={text} />

                <div className='file_upload'>
                    <i className='fas fa-image text-danger' style={{ paddingRight: '10px' }} />
                    <input type='file' name='file' id='file'
                        multiple accept='image/*,video/*' onChange={e => handleChangeMedia(e)} />
                </div>

                <button
                    type='submit' className='material-icons'
                    disabled={(text || media.length > 0) ? false : true}>
                    near_me
                </button>
            </form>
        </>
    )
}

export default RightSide