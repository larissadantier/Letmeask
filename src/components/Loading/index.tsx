import logoImg from '../../assets/images/logo.svg';
import './styles.scss'

export function Loading(){
    return (
      <div id='page-loading'>
        <div className='container-loading'>
            <img src={logoImg} alt="Logo" />
            <div className='loader'/>
        </div>
      </div>
    )
};