import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map(link => (
        <Link
          key={link.label}
          href={link.url || ""}
          className={
            "inline-block py-1 px-3 rounded-lg text-back text-sm " +
            (link.active ?  "bg-gray-950 text-white" : " ") +
            (!link.url ? " text-gray-500 cursor-not-allowed" : " hover:bg-gray-900 hover:text-white")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  )
}