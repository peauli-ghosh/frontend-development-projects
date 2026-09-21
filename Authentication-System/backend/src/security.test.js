import test from 'node:test';
import assert from 'node:assert/strict';
import { passwordStrength, validateCredentials } from './security.js';

test('username and password validation rejects missing credentials', () => {
  const result = validateCredentials('', '');
  assert.equal(result.errors.username, 'Username is required.');
  assert.equal(result.errors.password, 'Password is required.');
});

test('username validation normalizes valid usernames', () => {
  const result = validateCredentials('  Alice_01  ', 'StrongPass!9');
  assert.equal(result.username, 'alice_01');
  assert.deepEqual(result.errors, {});
});

test('password strength progresses with complexity', () => {
  assert.equal(passwordStrength('').score, 0);
  assert.ok(passwordStrength('simple123').score >= 2);
  assert.equal(passwordStrength('VeryStrong!123').score, 5);
});
