import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const user = null 
  const username = null

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">FIRE NEWS</button>
          </Link>
        </li>

        {username && (

          <>
            <li className="push-left">
              <Link href="/" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>

            <li>
              <Link href={`/${username}`} passHref>
                <Image src={user?.photoUrl} alt="profilePicture" />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <>
            <li>
              <Link href="/enter" passHref>
                <button className="btn-blue">Log In</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>


  )
}