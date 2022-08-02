import { dbConnect } from "../lib/db";
import { downloadEstates } from "../lib/sreality";

async function main() {
  console.log("Downloading estates");
  const estates = await downloadEstates();

  console.log("Connecting to DB");
  const db = await dbConnect();

  console.log("Reloading estate data");
  await db.reloadEstates(estates);
}

main().then(
  () => {
    process.exit(0);
  },
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
