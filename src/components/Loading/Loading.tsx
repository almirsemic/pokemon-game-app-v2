import Styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={Styles.loaded_wrapper}>
      <div className={Styles.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
