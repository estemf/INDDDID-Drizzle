import { db } from "./db";
import { users, posts } from "./schema";

async function main() {
  await db.delete(posts);
  await db.delete(users);
  const [alice] = await db.insert(users).values({ name: "Alice", email: "alice@demo.dev" }).returning();
  await db.insert(posts).values({ title: "Hello Drizzle", content: "Premier post", authorId: alice.id });
  process.exit(0);
}
main();
