import Styles from './GoHome.module.css'

interface typeProps {
  handleEndGame?: () => void
}

const GoHome = (props: typeProps) => {
  function handleEndGame() {
    if (props.handleEndGame) {
      props.handleEndGame()
    }
  }
  return (
    <button
      data-text="Awesome"
      className={Styles.button}
      onClick={() => handleEndGame()}
    >
      <span className={Styles.actual_text}>&nbsp;Home&nbsp;</span>
      <span className={Styles.hover_text} aria-hidden="true">
        &nbsp;Home&nbsp;
      </span>
    </button>
  )
}

export default GoHome
