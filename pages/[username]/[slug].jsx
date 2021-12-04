import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase"

export default function PostPage({ }) {
  return (
    <main>
    </main>
  )
}

// Tells next to fetch data on the server at build time in order to pre-render this page in advance
export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let post = null
  let path = null

  if (userDoc) {
    const query = userDoc.ref.collection('posts').where('slug', '==', slug)
    const postDoc = (await query.get()).docs[0]
    post = postToJSON(postDoc)
    console.log(post)
    path = postDoc.ref.path
  }

  // Revalidate tells next to regenerate this page on the server when you requests come in, but only during a time interval
  return {
    props: { post, path },
    revalidate: 5000
  }
}

export async function getStaticPaths() {
  // Improve by using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get()

  const paths = snapshot.docs.map((post) => {
    const { username, slug } = post.data()
    return { 
      params: { username, slug } 
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}