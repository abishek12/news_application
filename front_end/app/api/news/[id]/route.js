import { data } from '../../route';

export async function GET(_request, context) {
  const { params } = context;
  const { id } = await params; // Await `params`
  
  console.log("id======", id);

  const articleId = parseInt(id);
  if (isNaN(articleId)) {
    return new Response(JSON.stringify({ message: 'Invalid ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const article = data.find(item => item.source.id === articleId);
  if (article) {
    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: 'Article not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
}
