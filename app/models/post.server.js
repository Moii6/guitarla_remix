export async function getPosts() {
  const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`);
  return await respuesta.json();
}

export async function getPost({ Url }) {
  const respuesta = await fetch(
    `${process.env.API_URL}/posts?filters[url]=${Url}&populate=imagen`
  );
  return await respuesta.json();
}
