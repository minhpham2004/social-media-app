import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { logout } from '../../redux/actions/authAction'

function ModalConfirmLogout({ isOpen, setLogOutConfirm, dispatch }) {
    const handleLogout = () => {
        dispatch(logout())
    }

    const closeModal = () => {
        setLogOutConfirm(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            size="sm"
            className='big-modal'
            centered
        >
            <ModalBody>
                Are you sure want to logout?
            </ModalBody>
            <ModalFooter>
                <Button className='px-3' color="primary" onClick={handleLogout}>
                    Yes
                </Button>{' '}
                <Button className='px-3' color="secondary" onClick={closeModal}>
                    No
                </Button>
            </ModalFooter>

        </Modal>
    )
}

export default ModalConfirmLogout