import Link from 'next/link';
import Head from 'next/head';

import { listPostContent, countPosts } from '@/utils/posts';
import { listTags } from '@/utils/tags';

export default function Home({ posts, tags, pagination }) {
    return (
        <div>
            <Head>
                <title>Demo Blog</title>
            </Head>
            <h1>Welcome to my blog</h1>
            <p>This is a subtitle idk what to type here</p>
            <ul>
                {posts.map(blog => (
                    <li key={blog.slug}>
                        <Link href={`/blog/${blog.slug}`}>
                            {blog.date}:{blog.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const getStaticProps = async () => {
    const posts = listPostContent(1, 10);
    const tags = listTags();
    const pagination = {
        current: 1,
        pages: Math.ceil(countPosts() / 10),
    };
    return {
        props: {
            posts,
            tags,
            pagination,
        },
    };
};


