import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'

function Search() {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleClose = () => {
        setSearch('')
        setUsers([])
    }

    const handleSearch = async (e) => {
        e.preventDefault()

        if (!search) return;
        try {
            setLoad(true)
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setUsers(res.data.users)
            setLoad(false)
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
            setLoad(false)
        }
    }

    return (
        <form className='search_form' onSubmit={handleSearch}>
            <input
                type='text' name='search' id='search'
                title='Enter to Search'
                value={search}
                onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
            />

            <div className='search_icon' style={{ opacity: search ? 0 : 0.3 }}>
                <span className='material-icons'>search</span>
                <span>Enter to Search</span>
            </div>

            <div
                className='close_search'
                style={{ opacity: search ? 1 : 0 }}
                onClick={handleClose}
            >
                &times;
            </div>

            <button type='submit' style={{ display: 'none' }}>Search</button>

            {load && <img src={LoadIcon} alt="loading" className='loading'></img>}

            <div className='users'>
                {
                    search && users && users.map(user => (
                        <UserCard
                            key={user._id}
                            user={user}
                            border="border"
                            handleClose={handleClose}
                        />
                    ))
                }
            </div>
        </form>
    )
}

export default Search