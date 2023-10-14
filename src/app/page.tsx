import Link from "../../node_modules/next/link";

export default function Home() {



  return (
    <div className="">
      <Link
        href={'/crear-usuario'}
      >
        <button className="bg-red-500 p-2 text-white m-2 rounded-lg">ir a crear usuario</button>
      </Link>
      Index
    </div>
  )
}
