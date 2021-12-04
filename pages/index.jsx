import { useState } from 'react'
import { firestore, postToJSON, fromMillis } from '../lib/firebase'
import PostFeed from '../components/PostFeed'
import Loader from '../components/Loader'

// MAX post to query per page
const LIMIT = 1

export default function Home(props) {

  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true)
    const lastPost = posts[posts.length - 1]

    const cursor = typeof lastPost.createdAt === 'number' ? fromMillis(lastPost.createdAt) : lastPost.createdAt
    console.log(cursor)
    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT)

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  }

  return (
    <main>
      <h1>Recent News</h1>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load More</button>}

      <Loader show={loading}/>

      {postsEnd && <p>You have reached the end!</p>}
    </main>
  )
}

export async function getServerSideProps(context) {

  const postsQuery = firestore.
    collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(postToJSON)

  return {
    props: { posts }
  }
}