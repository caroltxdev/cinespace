import '../../styles/global.css'
import './ThemeToggle.css'

const ThemeToggle = ({theme, onToggle}) => {
    return(
    <button
      className="theme-toggle"
      onClick={onToggle}
      title={theme === 'dark' ? 'Mudar para claro' : 'Mudar para escuro'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
    )
}

export default ThemeToggle;