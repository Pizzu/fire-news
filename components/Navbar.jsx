/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '../lib/context'

export default function Navbar() {

  const { user, username } = useContext(UserContext)

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
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>

            <li>
              <Link href={`/${username}`} passHref>
                <img src={user?.photoURL} alt="profilePicture" />
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