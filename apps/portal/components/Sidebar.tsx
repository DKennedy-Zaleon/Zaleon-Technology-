import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Image
          src="/zaleon-systems-logo.png"
          alt="Zaleon Systems"
          width={210}
          height={70}
          priority
          className="brandLogo"
        />
        <div className="portalLabel">CLIENT PORTAL</div>
      </div>

      <nav>
        <Link href="/">Dashboard</Link>
        <Link href="/tickets">My Tickets</Link>
        <Link href="/tickets/new">Get Support</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/settings">Settings</Link>
      </nav>

      <div className="sidebarFooter">
        <span className="statusDot" /> Support portal online
      </div>
    </aside>
  );
}
