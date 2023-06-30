import './TodoHeader.scss'
import roket from '../../assets/rocket.svg'

function TodoHeader() {
    return(
        <header className='containerHeader'>
            <div className='containerTitle'>
                <img className='containerTitle__img' src={roket} alt="" />
                <p className='containerTitle__title'>to<span>do</span></p>
            </div>
        </header>
    )
}

export { TodoHeader }