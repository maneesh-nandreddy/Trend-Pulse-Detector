# TrendPulse Dashboard

TrendPulse is a sleek, real-time social media monitoring and trend intelligence MVP dashboard. Built for high performance and live data streaming, it uses Next.js 15, Tailwind CSS v4, shadcn/ui, Recharts, and Zustand.

## Getting Started

First, install the dependencies if you haven't already:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- \`src/app\`: Next.js 15 App router pages and layouts.
- \`src/components\`: UI components including the \`shadcn/ui\` base and \`dashboard\` specifics.
- \`src/hooks\`: Custom React hooks, including \`useWebSockets\` for real-time live data mock simulation.
- \`src/lib/mockService.ts\`: Generates the mock data logic reflecting a Big Data Kafka/Spark backend.
- \`src/store/useStore.ts\`: Global state management with Zustand for real-time aggregation metrics.

## From Mocked to Production Backend

Currently, the app relies on internal mock generators designed to simulate a massive data pipeline involving Kafka, Spark, Cassandra, Elasticsearch, and Hadoop. To hook this up to a real backend, take the following steps:

1. **WebSockets (Live Stream / Kafka)**
   - Open \`src/hooks/useWebSockets.ts\`.
   - Replace the \`setInterval\` mock intervals with an actual \`WebSocket\` or \`Socket.io\` connection.
   - Example: \`const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL)\`.
   - On \`ws.onmessage\`, parse the payload and call \`addMention(payload)\`.

2. **REST APIs (Cassandra / Elasticsearch metrics)**
   - In \`src/store/useStore.ts\`, remove the \`generateInitial...\` calls inside the state instantiation.
   - Use TanStack React Query or \`fetch\` in React Server Components to load initial KPIs and Trends from your real REST APIs.
   - Example: Fetching \`/api/trends/top\` mapped to your Spark streaming outputs.

3. **Explore Search (Elasticsearch)**
   - Open \`src/app/explore/page.tsx\`.
   - Instead of filtering the \`liveMentions\` in memory, implement a debounced API call to your Elasticsearch wrapper endpoint, passing the \`searchQuery\`, \`activePlatform\`, etc.
   
4. **Historical Reports (Hadoop/Hive)**
   - Open \`src/app/reports/page.tsx\`.
   - Wire the "Download PDF/CSV" buttons to trigger a query generation on your backend that interfaces with your Hadoop/Hive data warehouse infrastructure.

## Tech Specs
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 + Framer Motion
* **UI:** shadcn/ui
* **State Management:** Zustand
* **Charts:** Recharts
