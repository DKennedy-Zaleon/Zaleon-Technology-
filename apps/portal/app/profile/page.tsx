export default function Profile() {
  return (
    <>
      <div className="pageHeader"><div><h1>Profile</h1><div className="muted">Directory-backed account information.</div></div></div>
      <div className="panel"><div className="panelBody formGrid">
        <label>Name<input value="Jordan Davis" readOnly /></label>
        <label>Email<input value="jordan.davis@acme.example" readOnly /></label>
        <label>Department<input value="Finance" readOnly /></label>
        <label>Job Title<input value="Senior Analyst" readOnly /></label>
        <div className="notice">In production, these values will sync from the organization’s identity provider such as Microsoft Entra ID.</div>
      </div></div>
    </>
  );
}
