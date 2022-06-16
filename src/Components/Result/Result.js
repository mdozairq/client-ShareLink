import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import downloadimg from '../../Assets/download-sd.svg'
import "./Result.css"

const Result = ({ downloadResponse }) => {

    const handleCopy = async () => {
        let copyText = document.getElementById('copyText');
        copyText.select();
        document.execCommand('copy');
    };

    return (
        <div
            className="card"
        >
            <div>
                <img src={downloadimg} alt="download"/>
            </div>
            <div>
                <h1>Your Download link is here:</h1>
                <p>size:{Math.round(downloadResponse.response.size / 1000)}kb</p>
            </div>
            <div className="input-container">
                <input type="text" id="copyText" value={downloadResponse.file} readonly />
                <ContentCopyIcon className="cpybtn" onClick={handleCopy} />
            </div>
        </div>
    )
}

export default Result