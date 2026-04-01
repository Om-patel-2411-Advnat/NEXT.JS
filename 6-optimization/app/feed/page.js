import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// that's the static way of defining metadata
// export const metadata = {
//   title : 'All posts',
//   description : 'Showing all the posts'
// }

export async function generateMetadata(){
  const posts = await getPosts();
  const numberOfPosts = posts.length;

  return{
    title : `Browse all our ${numberOfPosts} posts`,
    description : "browse all our posts"
  }
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
