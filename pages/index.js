import Head from "next/head";
import React from "react";
import { client } from "../lib/sanity";
import Link from "next/link";

function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-8 text-black">
        <h1 className="mt-10 text-center text-3xl mb-10 font-extrabold tracking-tight text-gray-900">
          Welcome to my blog
        </h1>

        {posts.map((post, index) => (
          <Link key={index} as={`/posts/${post.slug}`} href="/posts/[slug]">
            <a className="mb-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <p className="mb-6 text-gray-400 uppercase text-sm">
                {new Date(post.publishedAt).toDateString().slice(4)}
              </p>
              <h3 className="text-3xl font-semibold text-gray-900">
                {post.title}
              </h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  const posts =
    await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    publishedAt,
    'slug': slug.current,
  }`);

  return {
    props: { posts },
  };
}
