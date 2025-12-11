import { useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Vite + React + Tailwind + shadcn/ui
          </h1>
          <p className="text-muted-foreground">
            Your project is ready to go! Start building amazing things.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 p-8 border rounded-lg bg-card">
          <p className="text-lg">
            Count: <span className="font-bold">{count}</span>
          </p>
          <div className="flex gap-2">
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
            <Button variant="secondary" onClick={() => setCount(count - 1)}>
              Decrement
            </Button>
            <Button variant="outline" onClick={() => setCount(0)}>
              Reset
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Edit <code className="bg-muted px-2 py-1 rounded">src/App.jsx</code>{' '}
            to get started
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
