/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'

const YoutubeEmbed = () => {
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/BtN-goy9VOY" allowFullScreen>
            </iframe>
        </div>
    )
}

export default YoutubeEmbed;