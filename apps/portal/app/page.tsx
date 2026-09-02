import Link from "next/link";

const tickets = [
  { id: "ZAL-1042", subject: "VPN disconnecting", status: "Open", priority: "High", updated: "8 min ago" },
  { id: "ZAL-1038", subject: "Outlook not syncing", status: "Waiting on You", priority: "Normal", updated: "24 min ago" },
  { id: "ZAL-1021", subject: "New monitor setup", status: "Resolved", priority: "Normal", updated: "Yesterday" }
];

export default function Dashboard() {
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Welcome back, Jordan</h1>
          <div className="muted">Acme Corporation · IT Support</div>
        </div>
        <Link className="primaryBtn" href="/tickets/new">Get Support</Link>
      </div>

      <div className="cards">
        <div className="card"><h3>Open Tickets</h3><div className="metric">2</div></div>
        <div className="card"><h3>Waiting on You</h3><div className="metric">1</div></div>
        <div className="card"><h3>Resolved</h3><div className="metric">18</div></div>
        <div className="card"><h3>Support Status</h3><div className="metric" style={{fontSize: 20}}>Available</div></div>
      </div>

      <div className="notice" style={{marginBottom: 20}}>
        Need help now? Start a live support request. If wait times are longer than normal,
        you can convert the same conversation into a queued ticket and leave the page.
      </div>

      <div className="panel">
        <div className="panelHeader">
          <strong>Recent Tickets</strong>
          <Link href="/tickets" className="muted">View all</Link>
        </div>
        <table>
          <thead><tr><th>Ticket</th><th>Subject</th><th>Status</th><th>Priority</th><th>Updated</th></tr></thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id}>
                <td><Link href={`/tickets/${t.id}`}>{t.id}</Link></td>
                <td>{t.subject}</td>
                <td><span className={`badge ${t.status === "Open" ? "open" : t.status === "Resolved" ? "resolved" : "waiting"}`}>{t.status}</span></td>
                <td><span className={`badge ${t.priority === "High" ? "high" : "normal"}`}>{t.priority}</span></td>
                <td className="muted">{t.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
