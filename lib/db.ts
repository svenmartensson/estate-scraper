import { Client } from "pg";
import { Estate } from "./model";

const PG_HOST = process.env.PG_HOST || "localhost";
const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "vejce";
const PG_DATABASE = process.env.PG_DATABASE || "estates";

export class DbClient {
  constructor(private readonly pg: Client) {}

  async reloadEstates(estates: Iterable<NewEstate>) {
    try {
      await this.pg.query("BEGIN");
      await this.clearEstates();
      await this.insertEstates(estates);
      await this.pg.query("COMMIT");
    } catch (err) {
      await this.pg.query("ROLLBACK");
      throw err;
    }
  }

  async clearEstates() {
    await this.pg.query("truncate table estates");
  }

  async insertEstates(estates: Iterable<NewEstate>) {
    await Promise.all(Array.from(estates, (e) => this.insertEstate(e)));
  }

  async insertEstate(estate: NewEstate) {
    await this.pg.query(
      `
    insert into estates(name, locality, "order", thumbnail)
    values ($1, $2, $3, $4);
  `,
      [estate.name, estate.locality, estate.order, estate.thumbnail]
    );
  }

  async listEstates(page: number, pageSize: number): Promise<Estate[]> {
    const offset = (page - 1) * pageSize;
    const result = await this.pg.query(
      `select * from estates order by "order" limit $1 offset $2`,
      [pageSize, offset]
    );
    return result.rows.map((row) => ({
      id: row.id,
      locality: row.locality,
      name: row.name,
      order: row.order,
      thumbnail: row.thumbnail,
    }));
  }

  async count(): Promise<number> {
    const result = await this.pg.query(
      'select count(*) as "count" from estates'
    );
    return Number.parseInt(result.rows[0].count);
  }
}

export type NewEstate = Omit<Estate, "id">;

export async function dbConnect(): Promise<DbClient> {
  const client = new Client({
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
  });
  await client.connect();
  return new DbClient(client);
}
