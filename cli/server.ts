import express from 'express';

export function startExplorer(port: number) {
  const app = express();
  app.get('/', (_, res) => res.send('Explorer backend running!'));
  app.listen(port, () => {
    console.log(`Explorer backend listening on http://localhost:${port}`);
  });
}