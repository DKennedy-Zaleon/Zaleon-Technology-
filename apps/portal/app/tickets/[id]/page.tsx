export default function TicketDetail({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="pageHeader">
        <div>
          <div className="muted">{params.id}</div>
          <h1>VPN disconnecting</h1>
        </div>
        <span className="badge open">Open</span>
      </div>

      <div className="grid2">
        <section className="panel">
          <div className="panelHeader"><strong>Conversation</strong><span className="muted">Morgan Lee · Technician</span></div>
          <div className="panelBody chat">
            <div className="message user">
              <div className="messageMeta">You · 9:14 AM</div>
              My VPN drops every few minutes when I am working from home.
            </div>
            <div className="message">
              <div className="messageMeta">System · 9:14 AM</div>
              We’re connecting you with a live support agent.
            </div>
            <div className="message">
              <div className="messageMeta">System · 9:18 AM</div>
              Your request was converted to a queued ticket. We’ll notify you when a technician is ready.
            </div>
            <div className="message tech">
              <div className="messageMeta">Morgan Lee · 9:31 AM</div>
              I’m ready to help. I’m reviewing your VPN connection history now.
            </div>
            <div className="message tech">
              <div className="messageMeta">Morgan Lee · 9:38 AM</div>
              I found repeated authentication retries. Can you confirm whether this started after a password change?
            </div>
            <textarea placeholder="Reply to your technician..." />
            <button className="primaryBtn" style={{width: 150}}>Send Reply</button>
          </div>
        </section>

        <aside className="panel">
          <div className="panelHeader"><strong>Ticket Details</strong></div>
          <div className="panelBody">
            <p><span className="muted">Status</span><br/><strong>Open</strong></p>
            <p><span className="muted">Priority</span><br/><strong>High</strong></p>
            <p><span className="muted">Technician</span><br/><strong>Morgan Lee</strong></p>
            <p><span className="muted">Created</span><br/><strong>Today, 9:14 AM</strong></p>
            <div className="kbMatch">
              <div className="small muted">RELATED SUPPORT ARTICLE</div>
              <strong>VPN authentication loop after password reset</strong>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
