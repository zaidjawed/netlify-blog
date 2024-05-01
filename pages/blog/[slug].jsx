import fs from "fs";
import React from 'react';
import yaml from "js-yaml";
import Head from 'next/head';
import matter from "gray-matter";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'

import { fetchPostContent } from '@/utils/posts';

const slugToPostContent = (postContents => {
    let hash = {}
    postContents.forEach(it => hash[it.slug] = it)
    return hash;
})(fetchPostContent());

export default function Blogs({
    title,
    dateString,
    slug,
    tags,
    author,
    description = "",
    source,
}) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <MDXRemote {...source} />
            </div>
        </>
    );
}

export const getStaticPaths = async () => {
    const paths = fetchPostContent().map(it => "/blog/" + it.slug);
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) => {
    const slug = params.slug;
    const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
    const { content, data } = matter(source, {
        engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) }
    });

    const mdxSource = await serialize(content);

    return {
        props: {
            title: data.title,
            dateString: data.date,
            slug: data.slug,
            description: "",
            tags: data.tags,
            author: data.author,
            source: mdxSource
        },
    };
};
