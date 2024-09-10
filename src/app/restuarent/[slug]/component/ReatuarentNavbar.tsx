import Link from 'next/link'
import React from 'react'

const ReatuarentNavbar = ({slug}: {slug: string}) => {
  return (
    <nav className="flex text-reg border-b pb-2">
        <Link href={`/restuarent/${slug}`} className="mr-7"> Overview </Link>
        <Link href={`/restuarent/${slug}/menu`} className="mr-7"> Menu </Link>
    </nav>
  )
}

export default ReatuarentNavbar