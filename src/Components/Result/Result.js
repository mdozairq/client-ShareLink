import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import downloadimg from '../../Assets/download-sd.svg';
import { Button } from '@mui/material';
import "./Result.css"

const Result = ({ downloadResponse }) => {

    const handleCopy = async () => {
        let copyText = document.getElementById('copyText');
        copyText.select();
        document.execCommand('copy');
    };

    const sendWhatsApp = async () => {

        window.open(
            `https://api.whatsapp.com/send?text=Here+is+your+Download+Link+generated+by+sharelinks.netlify.app:+${downloadResponse.file}`,
            // This is what makes it 
            // open in a new window.
            '_blank'
        );
    }

    return (
        <div
            className="card"
        >
            <div>
                <img className="img" src={downloadimg} alt="download" />
            </div>
            <div>
                <h1>Your Download link is here:</h1>
                <p>size:{Math.round(downloadResponse.response.size / 1000)}kb</p>
            </div>
            <div className="input-container">
                <input type="text" id="copyText" value={downloadResponse.file} readonly />
                <ContentCopyIcon className="cpybtn" onClick={handleCopy} />
            </div>
            <div>
                <Button variant="contained" onClick={sendWhatsApp} style={{ marginRight: "25px", backgroundColor: "green" }}>Share on Whatsapp</Button>
                <Button variant="outline">Share as Message</Button>
            </div>

        </div>
    )
}

export default Result
