import { useTheme } from '../../hooks/useTheme';
import moonImg from '../../assets/images/moon.svg'
import sunImg from '../../assets/images/sun.svg'
import './styles.scss'

export function Toggle(){
    const {theme, toggleTheme} = useTheme();
    return (
        <button className="toggleTheme" onClick={toggleTheme}><img src={theme === 'light' ? moonImg : sunImg} alt="Toogle Sun and Moon" /></button>
    )
};
