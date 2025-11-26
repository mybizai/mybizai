import { createKysely } from "@vercel/postgres-kysely";

import type { DB } from "./prisma/types";

import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

export const db = connectionString?.includes("localhost")
    ? new Kysely<DB>({
        dialect: new PostgresDialect({
            pool: new Pool({
                connectionString,
                ssl: false,
            }),
        }),
    })
    : createKysely<DB>();
