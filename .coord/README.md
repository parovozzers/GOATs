# .coord — coordination state for claude-coord

Files in this branch are managed by the `coord` CLI. Do not edit by hand.

- `log.jsonl` — append-only event log (messages, claims, edits, tasks)
- `presence/<agent>.json` — current status for each agent
- `locks/<hash>.lock` — active file locks
- `tasks.jsonl` — shared kanban (append-only)
