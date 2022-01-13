/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => {
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${embedId}`} allowFullScreen>
            </iframe>
        </div>
    )
}
YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;