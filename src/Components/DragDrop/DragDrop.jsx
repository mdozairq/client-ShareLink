import { Container } from '@mui/system';
import { Box } from '@mui/material';
import { Typography, LinearProgress, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useDropzone } from "react-dropzone";
import upload_file_svg from "../../Assets/upload.svg"
import Clouds from "../../Assets/upload_file_cloud.svg"
import axiosInstance from '../../axios/axiosInstance';
import './DragDrop.css'

const DragDrop = ({ setdownloadResponse }) => {
  const [upload_status, setUploadStatus] = useState(false);
  const [errors, setErrors] = useState(false)
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState()

  console.log(progress);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => {
    if (files.length) {
      setUploadStatus(true);
      console.log(files);
      let formData = new FormData()

      formData.append("file", files[0]);
      console.log("Form Data: ", formData);
      axiosInstance.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        },
        onDownloadProgress: (progressEvent) => {
          const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
          console.log(progress);
          setProgress(progress);
        }
      }).then(res => setdownloadResponse(res.data)).catch(error => {
        const { code } = error?.response?.data
        switch (code) {
          case "FILE_MISSING":
            setErrors("Please select a file before uploading!")
            break
          default:
            setErrors("Sorry! Something went wrong. Please try again later")
            break
        }
      })
    }
  }, [files]);

  return (
    <div
      className="card"
    >
      {upload_status ?
        (
          <div className='dropzone'>
            <img src={Clouds} alt={"cloud"}
            />
            <div className='progress'>
              <div className='progress-bar'>
                <Typography
                  variant='h6'
                  size="28px"
                >
                  File upload progress
                </Typography>
                <br />
                {errors && <Alert severity="error">{errors}</Alert>}
                {!errors && progress && (
                  <LinearProgress variant="determinate"
                    value={progress}
                    sx={{
                      width: '100%', height: '20px', borderRadius: "5px",
                      '& .MuiLinearProgress-bar1Determinate': {
                        backgroundColor: '#8CC0DE',
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )
        :
        (<div className='dropzone'>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <img src={upload_file_svg}
              alt={"upload"} />
          </div>
        </div>
        )
      }
    </div>
  );
}

export default DragDrop