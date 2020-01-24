import * as React from "react";
import ReactMarkdown from "react-markdown";
import { NextPage } from "next";
import { MarkdownFile, useLocalMarkdownForm } from "next-tinacms-markdown";
import grayMatter from "gray-matter";

const Post: NextPage<{ post: MarkdownFile }> = props => {
  const [post] = useLocalMarkdownForm(props.post, {
    fields: []
  });

  console.log(post);

  return (
    <>
      <h1>{post.frontmatter.title}</h1>
      <div>
        <ReactMarkdown source={post.markdownBody} />
      </div>
    </>
  );
};

Post.getInitialProps = async function(ctx) {
  const { slug } = ctx.query;
  const rawContent = await import(`../../posts/${slug}.md`);
  const { matter: frontmatter = {}, content: markdownBody } = grayMatter(
    rawContent.default
  );

  return {
    post: {
      fileRelativePath: `posts/${slug}.md`,
      frontmatter,
      markdownBody
    }
  };
};

export default Post;
