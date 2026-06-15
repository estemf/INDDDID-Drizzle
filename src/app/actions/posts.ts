"use server";
import { db } from "@/lib/db";
import { users, posts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getPostsWithAuthors() {
  return db.query.posts.findMany({
    with: { author: true },
    orderBy: (p, { desc }) => [desc(p.id)],
  });
}

export async function getUsers() {
  return db.query.users.findMany({ orderBy: (u, { asc }) => [asc(u.id)] });
}

export async function createUser(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  if (!name || !email) return;
  await db.insert(users).values({ name, email });
  revalidatePath("/");
}

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim() || null;
  const authorId = Number(formData.get("authorId"));
  if (!title || !authorId) return;
  await db.insert(posts).values({ title, content, authorId });
  revalidatePath("/");
}

export async function deletePost(formData: FormData) {
  const id = Number(formData.get("id"));
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/");
}
