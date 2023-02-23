import './Share.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, reset } from '../../features/posts/postSlice'
import { toast } from 'react-toastify'

import Loader from '../Loader'

const Share = () => {
  const user = useSelector((state) => state.auth.user)
  const token = user.token

  const [disabled, setDisabled] = useState(true)
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
    setSelectedFile(file)
    setFileInputState(e.target.value)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const [formData, setFormData] = useState({
    tags: '',
    text: '',
  })

  const { tags, text } = formData

  const onChange = (e) => {
    // Disable Button If Input is Empty
    if (e.target.name == 'text' && e.target.value.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const dispatch = useDispatch()

  const { posts, isError, isSuccess, isLoading, errors } = useSelector(
    (state) => state.posts
  )

  const avatar = useSelector((state) => state.auth.user.avatar)

  let textError =
    errors &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    errors.find((err) => err.param === 'text')
      ? 'is-invalid'
      : ''

  let tagsError =
    errors &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    errors.find((err) => err.param === 'tags')
      ? 'is-invalid'
      : ''

  // Submit Form
  const onSubmitHandler = (e) => {
    e.preventDefault()

    let postData = {
      text,
    }

    if (selectedFile) {
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onloadend = async () => {
        const base64EncodedImage = reader.result

        const imageResponse = await axios.post(
          '/api/upload',
          { data: base64EncodedImage },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        dispatch(
          createPost({
            text,
            image: imageResponse.data.secure_url,
          })
        )
        toast.success('Post added')
      }
      reader.onerror = () => {
        toast.error('Error Uploading Image')
      }
    } else {
      dispatch(createPost(postData))
      toast.success('Post added')
    }

    setPreviewSource('')
    setFileInputState('')
    setSelectedFile('')

    setFormData({
      text: '',
      tags: '',
    })
  }

  return (
    <div className='share'>
      <form className='d-inline-block w-100' onSubmit={onSubmitHandler}>
        <div className='shareWrapper'>
          <div className='shareTop'>
            <img className='shareProfileImg' src={avatar} alt='' />
            <input
              className='shareInput'
              placeholder='Whats in your mind?'
              name='text'
              value={text}
              required
              onChange={onChange}
            />
          </div>
          <hr className='shareHr' />
          <div className='shareBottom'>
            <div className='shareOptions'>
              <div className='shareOption'>
                <label className='shareImgLabel' htmlFor='image'>
                  <i className='fas fa-images shareIcon text-danger'></i>
                  <span className='shareOptionText'>Photo or Video</span>
                  <input
                    className='d-none'
                    type='file'
                    name='image'
                    id='image'
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    accept='image/png, image/jpeg, image/jpg'
                  />
                </label>
              </div>
              <div className='shareOption d-none d-sm-block'>
                <i className='fas fa-tag shareIcon text-info'></i>
                <span className='shareOptionText'>Tag</span>
              </div>
              <div className='shareOption d-none d-sm-block'>
                <i className='fas fa-location-arrow shareIcon text-success'></i>
                <span className='shareOptionText'>Location</span>
              </div>
              <div className='shareOption'>
                <i className='far fa-grin-alt shareIcon text-warning'></i>
                <span className='shareOptionText'>Feelings</span>
              </div>
            </div>
            <div>
              <button
                className='shareButton btn-success'
                type='submit'
                disabled={disabled || isLoading}>
                Share
              </button>
            </div>
          </div>
          {previewSource && (
            <img src={previewSource} className='shareImgPreview' alt=''></img>
          )}
        </div>
      </form>
    </div>
  )
}

export default Share
