import Link from "next/link";

const tickets = [
  ["ZAL-1042","VPN disconnecting","Open","High","Morgan Lee","8 min ago"],
  ["ZAL-1038","Outlook not syncing","Waiting on You","Normal","Alex Kim","24 min ago"],
  ["ZAL-1021","New monitor setup","Resolved","Normal","Taylor Reed","Yesterday"],
  ["ZAL-1014","Teams camera not detected","Resolved","Normal","Morgan Lee","Aug 29"]
];

export default function Tickets() {
  return (
    <>
      <div className="pageHeader">
        <div><h1>My Tickets</h1><div className="muted">Track every support request in one place.</div></div>
        <Link className="primaryBtn" href="/tickets/new">New Request</Link>
      </div>

      <div className="panel">
        <div className="panelHeader">
          <strong>Support Requests</strong>
          <input aria-label="Search tickets" placeholder="Search tickets..." style={{maxWidth: 280}} />
        </div>
        <table>
          <thead><tr><th>Ticket</th><th>Subject</th><th>Status</th><th>Priority</th><th>Technician</th><th>Updated</th></tr></thead>
          <tbody>
            {tickets.map(([id,subject,status,priority,tech,updated]) => (
              <tr key={id}>
                <td><Link href={`/tickets/${id}`}>{id}</Link></td>
                <td>{subject}</td>
                <td><span className={`badge ${status === "Open" ? "open" : status === "Resolved" ? "resolved" : "waiting"}`}>{status}</span></td>
                <td><span className={`badge ${priority === "High" ? "high" : "normal"}`}>{priority}</span></td>
                <td>{tech}</td>
                <td className="muted">{updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
