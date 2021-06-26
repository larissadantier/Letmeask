import logoImg from '../../assets/images/logo.svg';
import logoLightImg from '../../assets/images/logo-light.svg';
import './styles.scss'
import { useTheme } from '../../hooks/useTheme';

export function Loading(){
  const {theme} = useTheme();

    return (
      <div id='page-loading' className={theme}>
        <div className='container-loading'>
            <img src={theme === 'light' ? logoImg : logoLightImg} alt="Logo" />
            <div className='loader'/>
        </div>
      </div>
    )
};