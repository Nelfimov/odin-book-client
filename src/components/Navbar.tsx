import { NavLink, Link } from 'react-router-dom'
import { useEffect } from 'react'
import '../styles/Navbar.css'

interface NavbarProps {
  isLogged: boolean
  logout: () => void
}

/**
 * Navbar component
 */
export function Navbar ({ isLogged, logout }: NavbarProps): JSX.Element {
  /**
   * Show menu on click.
   */
  function showMenu (): string {
    const nav = document.querySelector('header nav')
    if (nav !== null) {
      nav.className = nav.className === 'hidden' ? 'active' : 'hidden'
      return nav.className
    }
    return ''
  }

  function getUserName (): string {
    const username = localStorage.getItem('username')
    if (username !== null) return JSON.parse(username)
    return ''
  }

  function getUserID (): string {
    const id = localStorage.getItem('userID')
    if (id !== null) return JSON.parse(id)
    return ''
  }

  useEffect(() => {
    const a = document.querySelectorAll('nav a')
    const nav = document.querySelectorAll('nav button')

    if (a !== null && nav !== null) {
      a.forEach((element) => {
        element.addEventListener('click', showMenu)
      })
      nav.forEach((element) => {
        element.addEventListener('click', showMenu)
      })
    }
  }, [])

  return (
    <header>
      <div className="header-container">
        <span className="logo">
          <Link to='/'>ODIN BOOK</Link>
        </span>
        { isLogged
          ? <nav className="hidden">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/posts/discover'>Discover</NavLink>
          <NavLink to='/posts/new'>New</NavLink>
          <NavLink
            to={`/profile/${getUserID()}`}>
            {getUserName()}
          </NavLink>
          <button onClick={logout}>
            <img src="/images/icons/logout.svg" alt="Log out" />
            Log out
          </button>
        </nav>
          : <nav className="hidden">
          <a href="https://github.com/nelfimov">Github</a>
        </nav>
        }
        <button className="menu" onClick={showMenu}>
          <img src="/images/icons/menu.svg" alt="Menu" />
        </button>
      </div>
    </header>
  )
}
