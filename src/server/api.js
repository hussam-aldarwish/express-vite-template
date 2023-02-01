import express from 'express';
const router = express.Router();

router.get('/', (_, res) => {
  res.json({ message: 'Hello from the API!' });
});

export default router;
