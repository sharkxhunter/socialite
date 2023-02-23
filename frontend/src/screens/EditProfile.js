import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Loader from '../components/Loader'

const EditProfile = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const auth = useSelector((state) => state.auth)

  const { user, isLoading, isError, errors, isSuccess } = auth

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    bio: user.bio || '',
    phone: user.contact.phone || '',
    url: user.contact.url || '',
    job: user.job || '',
    position: user.position || '',
    studied: user.studied || '',
  })

  const { name, email, bio, phone, url, job, position, studied } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if ((!user || !user.token) && !isLoading) {
      return navigate('/')
    }
  }, [user])

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      formData: {
        name,
        email,
        bio,
        phone,
        url,
        job,
        position,
        studied,
      },
      id: user._id,
    }

    dispatch(updateProfile(data, formData))

    toast.success('Profile updated')

    navigate('/profile')
  }

  return (
    <>
      {!user || !user.token ? (
        <Loader />
      ) : (
        <div>
          <Row className='d-flex justify-content-center mb-5 pt-5'>
            <Col md={8}>
              <LinkContainer className={'mb-3'} to={`/profile/${user._id}`}>
                <Button variant='secondary' type='button'>
                  <i className='fas fa-arrow-alt-circle-left pe-2'></i>
                  Back
                </Button>
              </LinkContainer>
              <h3 className='display-4 text-uppercase'>EDIT PROFILE</h3>
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter your full name'
                        name='name'
                        value={name}
                        onChange={onChange}
                      />

                      <div className='invalid-feedback'></div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Change your email'
                        name='email'
                        value={email}
                        onChange={onChange}
                      />

                      <div className='invalid-feedback'></div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className='mb-3'>
                  <Form.Label>Bio</Form.Label>
                  <textarea
                    className={`form-control`}
                    placeholder='Write your bio'
                    value={bio}
                    name='bio'
                    onChange={onChange}></textarea>

                  <div className='invalid-feedback'></div>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter your phone no.'
                        name='phone'
                        value={phone}
                        onChange={onChange}
                      />

                      <div className='invalid-feedback'></div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>URL</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter url'
                        name='url'
                        value={url}
                        onChange={onChange}
                      />

                      <div className='invalid-feedback'></div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className='mb-3'>
                  <Form.Label>Studied</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='I studied...'
                    name='studied'
                    value={studied}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Job</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter your job'
                    name='job'
                    value={job}
                    onChange={onChange}
                  />

                  <div className='invalid-feedback'></div>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter your job position'
                    name='position'
                    value={position}
                    onChange={onChange}
                  />
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default EditProfile
