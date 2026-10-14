import assert from 'node:assert/strict';
import {test} from 'node:test';
import {fetchFiatPrice, normalizeApiId} from '../src/services/FiatPriceApi.ts';

test('parses all providers and passes the cancellation signal to fetch', async (t) => {
  const fixtures = [
    {id: 20, host: 'api.coingecko.com', body: {bitcoin: {eur: 50_000, usd: 60_000}}},
    {id: 30, host: 'api.coinpaprika.com', body: {quotes: {EUR: {price: 50_000}, USD: {price: 60_000}}}},
    {id: 40, host: 'api.kraken.com', body: {error: [], result: {XXBTZEUR: {c: ['50000'], a: ['51000']}, XXBTZUSD: {c: ['60000'], a: ['61000']}}}},
  ];
  const controller = new AbortController();
  let fixture = fixtures[0];
  t.mock.method(globalThis, 'fetch', async (url: string, options: RequestInit) => {
    assert.equal(new URL(url).hostname, fixture.host);
    assert.equal(options.signal, controller.signal);
    return Response.json(fixture.body);
  });
  for (fixture of fixtures) {
    const data = await fetchFiatPrice(fixture.id, controller.signal);
    assert.deepEqual([data.ID, data.EUR, data.USD], [fixture.id, 50_000, 60_000]);
  }
});

test('rejects HTTP errors, missing fields, invalid prices and provider errors', async (t) => {
  let response = Response.json({bitcoin: {eur: 50_000, usd: 60_000}}, {status: 429});
  t.mock.method(globalThis, 'fetch', async () => response);
  await assert.rejects(fetchFiatPrice(20), /HTTP 429/);
  for (const body of [null, {}, {bitcoin: {eur: 0, usd: 60_000}}, {bitcoin: {eur: -1, usd: 60_000}}, {bitcoin: {eur: 'Infinity', usd: 60_000}}, {bitcoin: {eur: true, usd: 60_000}}, {bitcoin: {eur: 50_000, usd: ''}}]) {
    response = Response.json(body);
    await assert.rejects(fetchFiatPrice(20), /invalid price response/);
  }
  response = Response.json({error: ['Unknown asset pair']});
  await assert.rejects(fetchFiatPrice(40), /Unknown asset pair/);
  response = new Response('not JSON');
  await assert.rejects(fetchFiatPrice(20), SyntaxError);
});

test('legacy CryptoCompare and invalid saved API IDs migrate to Kraken', async (t) => {
  for (const id of [10, null, '20', 0, 99, NaN, {}]) assert.equal(normalizeApiId(id), 40);
  for (const id of [20, 30, 40]) assert.equal(normalizeApiId(id), id);
  t.mock.method(globalThis, 'fetch', async () => Response.json({result: {XXBTZEUR: {c: ['50000']}, XXBTZUSD: {c: ['60000']}}}));
  assert.equal((await fetchFiatPrice(10)).ID, 40);
  assert.equal((await fetchFiatPrice()).ID, 40);
});
