import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

const Name: NextPage = ({ repo }: any) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <p>{repo.id}</p>
      <p>{repo.name}</p>
      <p>{repo.description}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://api.github.com/users/pineladsn/repos`);
  const data = await response.json();
  const paths = data.map((repo: any) => {
    return {
      params: {
        name: repo.name,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params!;

  const response = await fetch(
    `https://api.github.com/repos/pineladsn/${name}`
  );
  const data = await response.json();

  return {
    props: {
      repo: data,
    },
    revalidate: 10,
  };
};

export default Name;
