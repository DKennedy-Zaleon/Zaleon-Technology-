export default function NewTicket() {
  return (
    <>
      <div className="pageHeader">
        <div><h1>Get Support</h1><div className="muted">Start with live support. You can leave the wait at any time without losing your place.</div></div>
      </div>

      <div className="grid2">
        <section className="panel">
          <div className="panelHeader"><strong>Describe the issue</strong></div>
          <div className="panelBody">
            <form className="formGrid">
              <label>Category
                <select defaultValue="">
                  <option value="" disabled>Select a category</option>
                  <option>Account / Access</option>
                  <option>Email / Microsoft 365</option>
                  <option>Network / VPN</option>
                  <option>Hardware</option>
                  <option>Software</option>
                  <option>Other</option>
                </select>
              </label>
              <label>Subject<input placeholder="Short description of the problem" /></label>
              <label>Priority
                <select defaultValue="Normal"><option>Low</option><option>Normal</option><option>High</option></select>
              </label>
              <label>Description<textarea placeholder="Tell us what is happening, what you expected, and anything you already tried." /></label>
              <label>Attachment<input type="file" /></label>
              <button type="button" className="primaryBtn">Start Support Request</button>
            </form>
          </div>
        </section>

        <aside className="panel">
          <div className="panelHeader"><strong>What happens next</strong></div>
          <div className="panelBody">
            <p>1. We try to connect you with a live technician.</p>
            <p>2. You can keep waiting or convert the same request into a queued ticket.</p>
            <p>3. If you leave, we notify you when a technician is ready.</p>
            <p>4. The same conversation continues until the issue is resolved.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
