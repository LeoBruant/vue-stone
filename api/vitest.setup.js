import { vi } from "vitest";

vi.stubEnv("DATABASE_URL", "sqlite::memory:")