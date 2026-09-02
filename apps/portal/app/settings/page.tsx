export default function Settings() {
  return (
    <>
      <div className="pageHeader"><div><h1>Settings</h1><div className="muted">Notification and security preferences.</div></div></div>
      <div className="panel"><div className="panelBody formGrid">
        <label><input type="checkbox" defaultChecked /> Email me when a technician is ready</label>
        <label><input type="checkbox" defaultChecked /> Show browser notifications</label>
        <label><input type="checkbox" defaultChecked /> Email me when a ticket is resolved</label>
        <label><input type="checkbox" /> SMS notifications (future)</label>
        <button className="primaryBtn" style={{width: 150}}>Save Settings</button>
      </div></div>
    </>
  );
}
