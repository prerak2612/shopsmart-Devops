const request = require('supertest');
const app = require('../src/app');

// ─── GET /api/health ────────────────────────────────────────────────────────

describe('GET /api/health', () => {
  it('should return HTTP 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  it('should return JSON content-type', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  it('should return status "ok"', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should return a non-empty message string', async () => {
    const res = await request(app).get('/api/health');
    expect(typeof res.body.message).toBe('string');
    expect(res.body.message.length).toBeGreaterThan(0);
  });

  it('should return a valid ISO 8601 timestamp', async () => {
    const res = await request(app).get('/api/health');
    const ts = new Date(res.body.timestamp);
    expect(ts.toString()).not.toBe('Invalid Date');
  });

  it('response body should contain exactly: status, message, timestamp', async () => {
    const res = await request(app).get('/api/health');
    expect(Object.keys(res.body).sort()).toEqual(
      ['message', 'status', 'timestamp'].sort()
    );
  });
});

// ─── GET / (root) ────────────────────────────────────────────────────────────

describe('GET /', () => {
  it('should return HTTP 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('should return a non-empty text body', async () => {
    const res = await request(app).get('/');
    expect(res.text.length).toBeGreaterThan(0);
  });
});

// ─── Unknown routes ──────────────────────────────────────────────────────────

describe('Unknown routes', () => {
  it('should return 404 for an undefined GET route', async () => {
    const res = await request(app).get('/undefined-route');
    expect(res.statusCode).toBe(404);
  });

  it('should return 404 for an undefined POST route', async () => {
    const res = await request(app).post('/api/does-not-exist');
    expect(res.statusCode).toBe(404);
  });
});
