var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();
app.UseCors();

var tickets = new[]
{
    new { Id = "ZAL-1042", Subject = "VPN disconnecting", Status = "Open", Priority = "High", Updated = "8 min ago" },
    new { Id = "ZAL-1038", Subject = "Outlook not syncing", Status = "WaitingOnUser", Priority = "Normal", Updated = "24 min ago" }
};

app.MapGet("/health", () => Results.Ok(new { status = "ok", service = "zaleon-api" }));
app.MapGet("/api/tickets", () => Results.Ok(tickets));
app.MapGet("/api/tickets/{id}", (string id) =>
{
    var ticket = tickets.FirstOrDefault(t => t.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
    return ticket is null ? Results.NotFound() : Results.Ok(ticket);
});

app.MapPost("/api/tickets", (CreateTicketRequest request) =>
{
    var created = new
    {
        Id = $"ZAL-{Random.Shared.Next(1100, 9999)}",
        request.Subject,
        request.Description,
        request.Category,
        request.Priority,
        Status = "Open"
    };

    // TODO: Send through ITicketingConnector (Jira first).
    return Results.Created($"/api/tickets/{created.Id}", created);
});

app.MapPost("/api/tickets/{id}/ready", (string id) =>
{
    // TODO: notify user through in-app/email/browser notification service.
    return Results.Ok(new { ticketId = id, state = "TechnicianReady" });
});

app.MapPost("/api/tickets/{id}/resolve", (string id, ResolutionRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.ResolutionSummary) ||
        string.IsNullOrWhiteSpace(request.StepsTaken))
        return Results.BadRequest(new { error = "Resolution summary and steps taken are required." });

    // TODO:
    // 1. Save structured resolution.
    // 2. Sync resolution to external ticketing platform.
    // 3. Feed safe structured data into Knowledge Engine.
    // 4. Draft internal vs user-facing knowledge based on privilege/sensitivity rules.
    return Results.Ok(new { ticketId = id, state = "Resolved", request.AdminPrivilegesRequired });
});

app.Run("http://localhost:5080");

record CreateTicketRequest(string Subject, string Description, string Category, string Priority);

record ResolutionRequest(
    string ResolutionSummary,
    string RootCause,
    string StepsTaken,
    bool AdminPrivilegesRequired
);
