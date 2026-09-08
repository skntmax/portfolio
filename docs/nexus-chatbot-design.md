# Chatbot Design: Nexus (Resume Portfolio Assistant)

## Intent Catalog
| Intent | Description | Example Utterances | Priority |
|--------|-----------|-------------------|---------|
| `intake_name` | Collect visitor name/username (skippable) | "Alex", "Skip" | H |
| `intake_contact` | Optional email/LinkedIn/phone for follow-up | "alex@co.com", "Skip" | H |
| `greeting` | Hello / small talk into resume Q&A | "Hi", "Hello Nexus" | M |
| `role` | Current title / what they do | "What is your current role?" | H |
| `experience` | Career background / years | "Walk me through your experience" | H |
| `paytm` | Paytm work specifically | "What did you do at Paytm?" | H |
| `swiftcab` | SwiftCab project | "Tell me about SwiftCab" | H |
| `projects` | Other shipped work | "What projects have you built?" | H |
| `skills` | Stack / strengths | "What are your strongest skills?" | H |
| `education` | Degree / school | "Where did you study?" | M |
| `contact` | How to reach Shashi | "How can I contact you?" | H |
| `availability` | Open to roles / hiring | "Are you open to new roles?" | H |
| `resume` | General about / CV summary | "Tell me about yourself" | M |
| `fallback` | Unrecognized / off-topic | "What's the weather?" | H |

## Dialogue Flows

### Visitor intake (multi-turn, skippable)
1. User opens Nexus
2. Bot: Step 1 — "What should I call you?" + Continue / **Skip**
3. User: name *or* Skip → if Skip, log as Anonymous and go to chat
4. Bot: Step 2 — "Any contact?" (email / LinkedIn / phone) + Start chatting / **Skip**
5. Bot: logs `POST /api/visit` → welcome + starter chips

### Resume Q&A (single-turn after intake)
1. User: "What did you do at Paytm?"
2. Bot: classifies `paytm` → `POST /api/ask` with `visitorId` → answer from docs + follow-up chips

### Fallback / handoff
1. After 1 API miss: explain + suggest role / Paytm / SwiftCab / skills / contact
2. After 2 misses: show Email + LinkedIn handoff

## Fallback Strategy
- After 1 miss: rephrase + suggest options
- After 2 misses: offer human handoff (email / LinkedIn)
- Off-topic: stay on resume docs; never invent bio facts

## Metrics Targets
| Metric | Target |
|--------|--------|
| Intent accuracy | > 85% |
| Containment (answered without email handoff) | > 70% |
| Fallback rate | < 15% |
| Intake completion (name or skip) | > 95% |
| Contact share rate (optional) | track only — no hard target |

## Follow-up logging
- File: `rag-starter/.data/visitors.jsonl`
- Peek: `GET http://127.0.0.1:3001/api/visits`
- Each ask appends a `question` event when `visitorId` is present
