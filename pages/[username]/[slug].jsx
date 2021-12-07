import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase'
import PostContent from '../../components/PostContent'
import styles from '../../styles/PostPage.module.css'
import { useDocumentData } from 'react-firebase-hooks/firestore'

export default function PostPage(props) {

  const postRef = firestore.doc(props.path)
  const [realtimePost] = useDocumentData(postRef)

  const post = realtimePost || props.post

  return (
    <main className={styles.container}>

      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

      </aside>
    </main>
  )
}

// Tells next to fetch data on the server at build time in order to pre-render this page in advance
export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let post = null
  let path = null

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true
    }
  }

  if (userDoc) {
    const postDoc = await userDoc.ref.collection('posts').doc(slug).get()
    if (!postDoc.exists) {
      return {
        notFound: true
      }
    } else {
      post = postToJSON(postDoc)
      path = postDoc.ref.path
    }
    
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