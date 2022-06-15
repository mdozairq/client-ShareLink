import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import "./Result.css"

const Result = ({ downloadResponse }) => {

    const handleCopy = async () => {
        let copyText = document.getElementById('copyText');
        copyText.select();
        document.execCommand('copy');
    };

    return (
        <div
            style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}
            className="card"
        >
            <div>
                <h1>Copy the generated link to share:</h1>
                <p>size:{Math.round(downloadResponse.response.size / 1000)}kb</p>
            </div>
            <div className='displaylink'>
                <input
                    type="text"
                    id="copyText" value={downloadResponse.file} />
                <button
                    id="copyBtn"
                    onClick={handleCopy}>
                    <ContentCopyIcon />
                </button>
            </div>
        </div>
    )
}

export default Result