import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ImageGenerator from './pages/ImageGenerator'
import TextGenerator from './pages/TextGenerator'
import EmojiGenerator from './pages/EmojiGenerator'
import SvgGenerator from './pages/SvgGenerator'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <NavBar />
      <main className="flex-1 animate-fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image" element={<ImageGenerator />} />
          <Route path="/text" element={<TextGenerator />} />
          <Route path="/emoji" element={<EmojiGenerator />} />
          <Route path="/svg" element={<SvgGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
