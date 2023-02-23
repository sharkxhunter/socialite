import { Container } from 'react-bootstrap'

const Footer = () => {
  //className='d-flex py-3 justify-content-center bg-secondary'
  return (
    <footer className='bg-secondary mt-auto'>
      <div>
        <Container>
          <span className='text-white'>2022 &copy; Socialite</span>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
