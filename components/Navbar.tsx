import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/create", label: "Create Event" },
];

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="DevEvent" width={24} height={24} />
          <span>DevEvent</span>
        </Link>

        <ul>
          {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;