# Architecture Notes

## Boundary rule

The frontend never calls Jira directly.

All support operations go through the Zaleon API. The API chooses the configured
ticketing connector for the organization.

This preserves the product's vendor-neutral UX layer.

## Conversation vs ticket

A Zaleon conversation is the user experience object.

A backend ticket is the work-record integration object.

One conversation may start as live support, become queued, continue asynchronously,
move through an external Teams/Zoom session, and eventually resolve without creating
multiple disconnected user-facing threads.
