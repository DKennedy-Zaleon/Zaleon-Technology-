# Zaleon Platform — Product Specification

## 1. Product Vision

Zaleon is a customer and employee support experience layer that sits on top of an organization’s existing ticketing system.

The goal is not to force companies to replace Jira, ServiceNow, Zendesk, or another help desk platform. Zaleon becomes the user-facing portal while the existing ticketing platform remains the backend workflow engine.

Users interact only with Zaleon. Technicians can continue using the company’s existing ticketing platform, or eventually work directly inside Zaleon as more native functionality is added.

Core positioning:

> A modern, vendor-neutral support experience layer over the ticketing system a company already uses.

---

## 2. Core Principles

- Human-first support experience.
- No rip-and-replace requirement.
- Existing ticketing systems remain usable.
- Zaleon owns the customer/user experience.
- Backend connectors abstract the underlying ticketing platform.
- SSO is the primary login experience.
- User information should be populated automatically from the organization’s identity provider.
- Live support and asynchronous ticket support should exist in one continuous conversation lifecycle.
- Internal queue pressure should not be unnecessarily exposed to end users.
- AI assists technicians and users but does not need to own the workflow.
- Knowledge should be generated from real resolved tickets over time.
- The architecture should remain modular enough to replace or expand backend systems later.

---

## 3. Primary User Roles

### End User
The employee or customer requesting support.

Capabilities:
- Sign in through SSO.
- Start a live support conversation.
- Submit or convert a support request into a queued ticket.
- View active and historical requests.
- Receive technician notifications.
- Rejoin a live conversation when a technician becomes available.
- Communicate asynchronously with the assigned technician.
- View ticket progress and resolution messages.

### Technician
The support agent resolving issues.

Capabilities:
- View and claim work.
- Prioritize active live conversations.
- Respond to queued and asynchronous tickets.
- See user identity, department, role, and company context.
- View suggested internal knowledge articles.
- Update ticket status.
- Complete mandatory resolution details before closure.
- Mark whether administrative privileges were required.

### Administrator / Support Lead
The organization or Zaleon administrator managing the environment.

Capabilities:
- Configure support routing.
- Define priority users and groups.
- Manage knowledge approvals.
- Manage ticketing connectors.
- Configure response rules.
- Manage notification settings.
- Configure identity and SSO integrations.
- View analytics and support performance.

---

## 4. Authentication and Identity

The Zaleon Portal is the front door.

Users should not be sent directly to Jira, ServiceNow, Zendesk, or another ticketing website.

### Login Flow

1. User navigates to the Zaleon Portal.
2. User selects the organization SSO login.
3. Zaleon authenticates against the customer’s identity provider.
4. Zaleon retrieves available profile information such as:
   - Name
   - Email
   - Department
   - Job title
   - Role
   - Group membership
   - Company
5. Zaleon uses this information to automatically enrich future support requests.

Initial identity target:
- Microsoft Entra ID / Microsoft 365

Future identity connectors may include:
- Okta
- Google Workspace
- Other SAML/OIDC identity providers

---

## 5. Zaleon API Layer

The Zaleon API sits between the portal and external systems.

The portal should never be tightly coupled to a specific ticketing vendor.

```text
Zaleon Portal
      |
      v
Zaleon API
      |
      +--> Identity Connector
      +--> Ticketing Connector
      +--> Notification Service
      +--> AI / Knowledge Engine
      +--> Zaleon Database
```

The API should normalize data so the frontend behaves consistently regardless of backend ticketing system.

Example connector interface:

```text
CreateTicket()
UpdateTicket()
GetTicket()
GetTicketsForUser()
AddComment()
AddAttachment()
AssignTicket()
ResolveTicket()
ReopenTicket()
GetTicketStatus()
```

Initial ticketing connector:
- Jira Service Management

Future connectors:
- ServiceNow
- Zendesk
- Freshservice
- HaloITSM
- Other ITSM/help desk platforms

---

## 6. Support Conversation Model

Zaleon should treat support as a continuous conversation rather than forcing the user to think about separate systems.

```text
Live Support Requested
        |
        v
Waiting for Technician
        |
        +--> Live Technician Connected
        |
        +--> Converted to Queued Ticket
                    |
                    v
              Technician Claims
                    |
                    v
              User Notified
                    |
                    v
              User Rejoins Chat
                    |
                    v
              Issue Resolved
                    |
                    +--> Closed
                    |
                    +--> Continued Async Work
```

The same conversation history should remain available throughout the lifecycle.

---

## 7. Human-First Live Chat

When a user opens support chat, the default experience is human-first.

Initial message example:

> We’re connecting you with a live support agent.

The system should not immediately redirect the user into an AI-only support workflow.

AI may assist behind the scenes, but the user is expecting access to a technician.

---

## 8. Waiting Experience

While a user is waiting for a live technician, Zaleon should avoid exposing unnecessary internal queue details.

Do not show:
- Exact number of users ahead.
- Internal ticket backlog.
- Technician staffing levels.
- Internal queue health.

Optional:
- Generic wait messaging.
- Estimated wait time only if the organization chooses to enable it.

Preferred default:

> We’re still connecting you with a technician.

If the wait becomes unusually long:

> Support is currently experiencing longer-than-normal wait times. You can continue waiting or convert this request into a queued ticket and we’ll notify you when a technician is ready.

---

## 9. Convert Live Chat to Queued Ticket

A persistent option should be available during the waiting experience.

Example text:

> Don’t want to wait here? Continue as a ticket.

Selecting this option:
1. Creates a ticket in Zaleon.
2. Syncs the request into the connected help desk platform.
3. Keeps the conversation history.
4. Places the request into the support queue.
5. Allows the user to leave the chat page.
6. Notifies the user when a technician claims the request.

This is not “skipping the line.” It changes the interaction from actively waiting to asynchronous waiting.

---

## 10. Technician Claim and User Rejoin

When a technician claims a queued request:
1. Technician opens the request.
2. Technician selects an action such as Start Session, Contact User, or Ready for User.
3. Zaleon notifies the user.

Notification example:

> A technician is ready to help with your support request. Click here to rejoin the conversation.

Notification channels may include:
- In-app notification
- Browser notification
- Email
- SMS if enabled later

The organization may configure a rejoin window.

If the user does not rejoin in time, the ticket continues asynchronously rather than failing or closing.

---

## 11. One Queue, Multiple States

Live chat and queued tickets should not become two disconnected work systems.

They should be represented as different states inside one support work queue.

Suggested priority behavior:
1. Active live users waiting for immediate support.
2. Critical / high-priority incidents.
3. VIP or priority-routed users.
4. Queued requests waiting for technician action.
5. Normal asynchronous tickets.
6. Low-priority work.

The exact scoring model should be configurable by organization.

---

## 12. Priority Routing and Support Tiers

Some users or issues require a higher level of support.

Examples:
- Executives
- CFO/C-suite
- Department heads
- High-impact business users
- Critical incidents
- Time-sensitive business events

Organizations should be able to define priority support rules.

Possible criteria:
- Entra ID group
- Job title
- Department
- User tag
- Support plan
- Issue severity
- Application or service impacted

Priority users may receive:
- Higher queue priority
- Faster response target
- Dedicated escalation path
- Priority support phone number
- Direct technician routing

This should be positioned as configurable support tiers, not denial of support to standard users.

---

## 13. Long-Running Tickets

Not every issue will be solved inside a live session.

If the issue requires hours or days of work, the existing conversation becomes the communication thread for the ticket.

The user should be able to see:
- Ticket status
- Assigned technician
- Last update
- Current work state
- Technician messages
- Attachments
- Resolution progress
- Final resolution message

The user can continue the same conversation without starting over.

---

## 14. External Communication Tools

Zaleon should not attempt to replace Teams, Zoom, phone, remote-support tools, or other existing collaboration platforms during the initial product phase.

Instead, Zaleon remains the coordination layer and records transitions in the activity timeline.

```text
9:14 AM — Live support requested
9:18 AM — Converted to queued ticket
9:31 AM — Technician assigned
9:34 AM — User rejoined conversation
9:42 AM — Teams session started
10:11 AM — Ticket moved to Investigating
1:46 PM — Technician update posted
3:20 PM — Ticket resolved
```

---

## 15. User Portal

Phase 1 user portal navigation:
- Home / Dashboard
- Support
- My Tickets
- Knowledge
- Notifications
- Profile
- Settings

### Dashboard
Possible cards:
- Open Tickets
- Waiting on You
- Resolved Tickets
- Recent Activity
- Service Health
- Devices (future)

Primary action:
- Get Support / New Request

### My Tickets
Columns:
- Ticket ID
- Subject
- Status
- Priority
- Assigned Technician
- Last Updated

Filters:
- Open
- Waiting
- Resolved
- All

### Ticket Detail
Display:
- Ticket title
- Ticket ID
- Status
- Priority
- Technician
- Created date
- Last updated
- Conversation timeline
- Attachments
- Activity history
- Resolution
- Reopen option if allowed

---

## 16. Technician Experience

Technician dashboard should prioritize actionable support.

Possible sections:
- Live Users Waiting
- Priority Requests
- My Assigned Tickets
- Unassigned Queue
- Waiting on User
- Escalated
- Recently Resolved

Ticket view should include:
- User identity
- Department
- Job title
- Company
- Priority status
- Conversation history
- Ticket metadata
- Related tickets
- Suggested knowledge
- Internal notes
- Attachments
- Connected backend ticket ID

---

## 17. Mandatory Ticket Resolution Workflow

A technician should not be able to close or resolve a ticket without completing the required resolution workflow.

This requirement is not optional at the technician level.

When the technician selects **Resolve**, a mandatory Zaleon resolution window appears.

Required fields:

### Resolution Summary
Explain what resolved the issue.

### Root Cause
What caused the issue, if known.

### Steps Taken
What actions were performed.

### Admin Privileges Required?
Dropdown:
- Yes
- No

Optional future fields:
- Resolution category
- Application
- Device
- Root cause category
- Vendor involved
- Escalation required
- Reusable fix
- User action required
- Follow-up required

The ticket cannot be marked resolved until mandatory fields are completed.

---

## 18. AI Knowledge Engine

Closed-ticket resolution data becomes structured input for the Zaleon Knowledge Engine.

The AI should analyze:
- Resolution summary
- Root cause
- Steps taken
- Ticket title
- Ticket description
- Conversation history
- Ticket category
- Admin privilege requirement
- Similar historical tickets

The system should identify recurring patterns and group similar resolutions.

---

## 19. Automatic Knowledge Article Generation

When repeated issues are detected, Zaleon can generate a draft knowledge article.

### User-Facing Article

If:
- The issue is recurring.
- The solution can safely be performed by the user.
- The resolution does not require administrator privileges.
- The content does not expose sensitive internal information.

The AI may draft a public/user-facing knowledge article.

### Internal Technician Article

If:
- Administrator privileges were required.
- The fix includes sensitive commands.
- The workflow involves privileged systems.
- The article should not be exposed to end users.

The AI creates an internal technician article.

---

## 20. Knowledge Approval

AI-generated knowledge should initially use an approval workflow.

```text
Drafted by AI
      |
      v
Pending Review
      |
      +--> Approved
      +--> Edited and Approved
      +--> Rejected
```

Reviewers may include:
- Technician
- Senior technician
- Team lead
- Administrator

Future customers may optionally enable automatic publishing for low-risk article categories.

---

## 21. Technician Knowledge Notifications

When a new article is created or approved, technicians should receive a notification.

Examples:
- New internal article available
- New user-facing article published
- Existing article updated
- Article matched to your open ticket

Technician dashboard example:

> 3 new knowledge articles were created from recently resolved tickets.

---

## 22. Contextual Knowledge Suggestions

When a technician opens a ticket, the Knowledge Engine should automatically look for likely matches.

Example:

> Suggested Internal Article  
> Outlook authentication loop after password reset  
> 92% match

Possible actions:
- Open Article
- Attach to Ticket
- Use Resolution
- Not Relevant

The same system can eventually assist users before technician involvement, but human-first support remains the default product philosophy.

---

## 23. Knowledge Feedback Loop

```text
Ticket Resolved
      |
      v
Resolution Captured
      |
      v
AI Analyzes Ticket
      |
      v
Similar Tickets Clustered
      |
      v
Knowledge Draft Created
      |
      v
Technician Approval
      |
      v
Knowledge Published
      |
      v
Suggested on Future Tickets
      |
      v
Usage and Success Measured
```

Useful metrics:
- Article usage
- Technician acceptance rate
- User success rate
- Tickets avoided
- Average resolution time reduction
- Reopened tickets after article usage
- Number of duplicate incidents reduced

---

## 24. Notifications

Zaleon should support an internal notification system.

Notification types:
- Technician ready
- New technician message
- Ticket assigned
- Ticket status changed
- Ticket waiting on user
- Ticket resolved
- Ticket reopened
- New knowledge article
- Knowledge article matched
- Escalation triggered

Initial channels:
- In-app
- Email
- Browser

Future:
- SMS
- Microsoft Teams
- Slack

---

## 25. Data Model Concepts

Core internal objects may include:
- Organization
- User
- Technician
- Conversation
- Ticket
- Message
- Activity
- Attachment
- TicketConnector
- IdentityConnector
- KnowledgeArticle
- KnowledgeMatch
- Resolution
- Notification

---

## 26. Recommended Technical Architecture

### Frontend
- Next.js
- TypeScript

### Backend
- ASP.NET Core Web API

### Database
- PostgreSQL

### Authentication
- OIDC / OAuth 2.0
- Microsoft Entra ID initially

### Infrastructure
- Cloudflare in front of public services
- Containerized backend
- Managed PostgreSQL
- Object storage for attachments

### Integrations
- Jira Service Management API first
- Microsoft Graph for identity and directory data

### AI Layer
Provider-independent AI service abstraction.

```text
IAIService
  GenerateSummary()
  ClassifyTicket()
  FindSimilarTickets()
  DraftKnowledgeArticle()
  SuggestKnowledge()
  DetectSensitiveContent()
```

This prevents the product from depending permanently on one AI provider.

---

## 27. Suggested Repository Structure

```text
zaleon-platform/
│
├── README.md
├── docs/
│   ├── product-spec.md
│   ├── architecture.md
│   ├── support-workflow.md
│   ├── knowledge-engine.md
│   ├── api-contracts.md
│   └── roadmap.md
│
├── apps/
│   └── portal/
│       └── Next.js frontend
│
├── services/
│   └── api/
│       └── ASP.NET Core backend
│
├── connectors/
│   ├── jira/
│   ├── servicenow/
│   ├── zendesk/
│   └── identity/
│
├── packages/
│   ├── ui/
│   ├── contracts/
│   └── shared/
│
└── infrastructure/
```

---

## 28. Phase 1 MVP

### User Experience
- SSO login
- Dashboard
- Start support request
- Live waiting state
- Convert to queued ticket
- My Tickets
- Ticket detail
- Continuous conversation
- Notifications
- Profile

### Technician Experience
- Live queue
- Ticket queue
- Claim ticket
- Respond to user
- Ticket detail
- Resolve ticket
- Mandatory resolution form

### Integrations
- Jira Service Management
- Microsoft Entra ID

### Knowledge
- Capture structured resolution
- Admin privilege field
- AI article draft generation
- Internal vs user-facing classification
- Review/approval
- Suggested articles inside technician ticket view

---

## 29. Phase 2

- Priority user routing
- Support tiers
- SLA policies
- Browser notifications
- SMS notifications
- Teams integration
- Additional ticketing connectors
- Knowledge analytics
- User-facing knowledge search
- Automatic duplicate-ticket detection
- AI ticket summaries
- AI technician assist

---

## 30. Future Platform Expansion

Potential future modules:
- Asset inventory
- Device management visibility
- License inventory
- Microsoft 365 tenant information
- Service health
- Billing and invoices
- Customer reports
- SLA reporting
- Technician analytics
- Remote support integrations
- RMM integrations
- Vendor management
- Change requests
- Problem management
- Employee onboarding/offboarding workflows

These should not block the initial product.

---

## 31. Product Positioning

Zaleon should initially be sold as:

> A modern employee support experience that sits on top of the help desk system you already use.

Alternative positioning:

> Give employees one modern support portal without replacing your existing ITSM platform.

Key advantages:
- Faster deployment
- Better user experience
- No rip-and-replace
- SSO and directory-aware support
- Human-first live assistance
- Continuous conversation across the ticket lifecycle
- Priority routing
- AI-powered institutional knowledge
- Vendor-neutral ticketing integrations

---

## 32. Design Philosophy

The product should feel:
- Simple
- Calm
- Modern
- Enterprise-ready
- Human
- Fast

Users should not need to understand:
- Ticket queues
- ITSM terminology
- Assignment groups
- Backend platforms
- Escalation mechanics

The system should expose only what helps the user understand:
- We received your request.
- Someone is working on it.
- We need something from you.
- A technician is ready.
- Here is the latest update.
- Your issue has been resolved.

That is the experience Zaleon should own.
