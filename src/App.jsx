import Navbar    from './components/Navbar'
import Hero       from './sections/Hero'
import About      from './sections/About'
import Skills     from './sections/Skills'
import Experience from './sections/Experience'
import Projects   from './sections/Projects'
import Contact    from './sections/Contact'
import Footer     from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#080B12] text-gray-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
