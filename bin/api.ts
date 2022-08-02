import fastify, {
  FastifyInstance,
  FastifyRequest,
  RouteHandlerMethod,
} from "fastify";
import { DbClient, dbConnect } from "../lib/db";

const API_PORT = Number.parseInt(process.env.API_PORT || "3001");
const API_HOST = process.env.API_HOST || "localhost";

async function main() {
  const db = await dbConnect();
  const app = fastify();

  getEstates(db, app);

  console.log(`Listening at ${API_PORT}`);
  await app.listen({
    port: API_PORT,
    host: API_HOST,
  });
}

function getEstates(db: DbClient, app: FastifyInstance) {
  app.route({
    method: "GET",
    url: "/estates",
    schema: {
      querystring: {
        page: {
          type: "number",
        },
        pageSize: {
          type: "number",
        },
      },
    },
    handler: async (
      req: FastifyRequest<{
        Querystring: { page?: number; pageSize?: number };
      }>,
      rep
    ) => {
      const page = Math.max(req.query.page ?? 1, 1) | 0;
      const pageSize = Math.max(req.query.pageSize ?? 20, 10) | 0;

      const [estates, count] = await Promise.all([
        db.listEstates(page, pageSize),
        db.count(),
      ]);

      rep.header("Access-Control-Allow-Origin", "*");

      return { estates, count };
    },
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
