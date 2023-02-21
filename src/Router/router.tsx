import { Route, Routes } from 'react-router-dom'
import Game from '../components/Game/Game'
import Home from '../components/Home/Home'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}

export default Router
