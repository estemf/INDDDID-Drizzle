import { getPostsWithAuthors, getUsers, createUser, createPost, deletePost } from "./actions/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, users] = await Promise.all([getPostsWithAuthors(), getUsers()]);

  return (
    <main>
      <h1>Demo CRUD <span className="badge">Drizzle</span></h1>
      <p><small>Next.js 15 · App Router · PostgreSQL · relation User → Post</small></p>

      <div className="card">
        <h2>Nouvel utilisateur</h2>
        <form action={createUser}>
          <div className="row">
            <input name="name" placeholder="Nom" required />
            <input name="email" type="email" placeholder="Email" required />
          </div>
          <button type="submit">Ajouter l'utilisateur</button>
        </form>
      </div>

      <div className="card">
        <h2>Nouveau post</h2>
        <form action={createPost}>
          <input name="title" placeholder="Titre" required />
          <textarea name="content" placeholder="Contenu (optionnel)" rows={2} />
          <select name="authorId" required defaultValue="">
            <option value="" disabled>Choisir un auteur…</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <button type="submit">Publier le post</button>
        </form>
      </div>

      <div className="card">
        <h2>Posts ({posts.length})</h2>
        <ul>
          {posts.map((p) => (
            <li key={p.id}>
              <span><strong>{p.title}</strong><br /><small>par {p.author.name}{p.content ? ` — ${p.content}` : ""}</small></span>
              <form action={deletePost}>
                <input type="hidden" name="id" value={p.id} />
                <button className="del" type="submit">Suppr.</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
