import './Loader.scss'

const Loader = ({ message = 'Loading...' }) => (
    <main className='loader-screen'>
        <div className='loader-spinner' />
        <p className='loader-message'>{message}</p>
    </main>
)

export default Loader
