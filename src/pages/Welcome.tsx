import { useHistory } from "react-router";

export default function Welcome() {

  const history = useHistory()

  const handleLogin = (e: any) => {
    e.preventDefault();
    let username = e.target[0].value;
    history.push('/posts', { username });
  }

  return (
    <>

      <div className='vh-100 vw-100 bg-light'>

        <div style={{ paddingTop: '10vh' }}>
          <div className='mx-auto col-lg-4 col-md-7 col-11 text-center'>
            <h1 className='text-primary'>Chirp.</h1>

            <p>Chirp is a recommendation system that integrates the <a href='https://github.com/BlackHart98/Litmus'>litmus service.</a></p>
            <p>
              This application mimicks a social media application and recommends friends and topics to follow based on your interaction with posts.
            </p>

            <div className='px- lg-5 px -md-4'>
              <form onSubmit={handleLogin} style={{ width: '400px' }} className='bg-white d-flex flex-column border p-3 text-start mx-auto'>

                <label htmlFor="username" className='mb-2'>Enter your username</label>

                <input autoFocus id='username' type="text" required placeholder="username" className='mb-1 bg-light form-control' />
                <small>Don't worry, your details are not saved, this is just a demo interaction with the service.</small> <br />

                <button type='submit' className='mb-3 btn btn-primary'>Login</button>

              </form>
            </div>

            <div className='mt-2'>
              Authors: <a href="https://twitter.com/@__ebukaodini">Pius</a>, <a href="https://twitter.com/@__ebukaodini">Ebuka</a>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}