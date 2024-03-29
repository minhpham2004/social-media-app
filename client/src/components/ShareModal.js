import React from 'react'
import {
    FacebookShareButton, FacebookIcon,
    FacebookMessengerShareButton, FacebookMessengerIcon,
    EmailShareButton, EmailIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
} from "react-share";

function ShareModal({ url, theme }) {
    return (
        <div
            className='d-flex justify-content-between px-4 py-2'
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        >
            <FacebookShareButton url={url}>
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>

            <FacebookMessengerShareButton url={url}>
                <FacebookMessengerIcon round={true} size={32} />
            </FacebookMessengerShareButton>

            <TwitterShareButton url={url}>
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>

            <TelegramShareButton url={url}>
                <TelegramIcon round={true} size={32} />
            </TelegramShareButton>

            <EmailShareButton url={url}>
                <EmailIcon round={true} size={32} />
            </EmailShareButton>

            <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>
        </div>
    )
}

export default ShareModal