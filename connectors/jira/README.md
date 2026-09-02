# Jira Connector

This folder is intentionally a connector boundary rather than Jira-specific code in the portal.

Production implementation should expose an interface similar to:

```csharp
public interface ITicketingConnector
{
    Task<Ticket> CreateTicketAsync(CreateTicketRequest request);
    Task<Ticket?> GetTicketAsync(string externalId);
    Task AddCommentAsync(string externalId, string body);
    Task ResolveTicketAsync(string externalId, Resolution resolution);
}
```

Store Jira credentials in environment variables or a secret manager.

Do not expose Jira project keys, API tokens, or backend URLs to the browser.
