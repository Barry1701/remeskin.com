// src/setupTests.js

import * as streams from "web-streams-polyfill";

if (!globalThis.TransformStream) {
  globalThis.TransformStream = streams.TransformStream;
}
if (!globalThis.ReadableStream) {
  globalThis.ReadableStream = streams.ReadableStream;
}
if (!globalThis.WritableStream) {
  globalThis.WritableStream = streams.WritableStream;
}

// TextEncoder, jeśli potrzebny:
import "fast-text-encoding";

// Testing Library:
import "@testing-library/jest-dom";

// Dopiero po polifillach - MSW
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
