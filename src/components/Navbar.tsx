import { Link } from 'react-router-dom'

export default function Navbar() {

// export default function Navbar() {
//   const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  // // const NavLink = ({ to, id, children }: { to: string; id: string; children: string }) => {
  //   const isHovered = hoveredLink === id

  //   return (
  //     <Link 
  //       to={to}
  //       className="relative overflow-hidden inline-block"
  //       onMouseEnter={() => setHoveredLink(id)}
  //       onMouseLeave={() => setHoveredLink(null)}
  //       style={{ height: '1.5em' }}
  //     >
  //       <div 
  //         style={{
  //           transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
  //           transition: 'transform 0.15s ease-in-out'
  //         }}
  //       >
  //         <span className="block text-white" style={{ height: '1.5em', lineHeight: '1.5em' }}>
  //           {children}
  //         </span>
  //         <span 
  //           className="block text-white absolute top-full left-0" 
  //           style={{ 
  //             fontFamily: '"Wulkan Display", serif',
  //             height: '1.5em',
  //             lineHeight: '1.5em'
  //           }}
  //         >
  //           {children}
  //         </span>
  //       </div>
  //     </Link>
  //   )
  // }

  return (
    <nav className="fixed top-5 left-12 right-12 z-50 py-4">
      {/* Vignette overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '180px',
          background: 'linear-gradient(180deg, rgba(4, 4, 4, 0.95) 0%, rgba(4, 4, 4, 0.6) 45%, rgba(4, 4, 4, 0) 100%)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">
          CodeBlooded
        </Link>
        
        {/* <div className="flex items-center gap-12">
          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wider">
            <NavLink to="/work" id="work">WORK</NavLink>
            <NavLink to="/about" id="about">ABOUT</NavLink>
            <NavLink to="/thoughts" id="thoughts">THOUGHTS</NavLink>
            <NavLink to="/contact" id="contact">CONTACT</NavLink>
          </div>
        </div> */}
<button 
          className="text-sm font-medium tracking-wider text-white transition-all duration-200"
          style={{
            padding: '0.875rem 1rem',
            border: '1px solid white',
            borderRadius: '0.25rem',
            background: 'transparent',
            boxShadow: '0px 0px 0px 0px rgba(94, 234, 123, 0)',
            letterSpacing: '0.075rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(94, 234, 123, 0.05)'
            e.currentTarget.style.boxShadow = '6px 6px 0px 0px rgba(94, 234, 123, 0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = '0px 0px 0px 0px rgba(94, 234, 123, 0)'
          }}
        >
          Zinnovatio 3.0
        </button>
      </div>
    </nav>
  )
}