import type { GetServerSideProps, NextPage } from "next";

const Home: NextPage = ({ repositoriesNames }: any) => {
  return (
    <ul>
      {repositoriesNames.map((name: string, index: number) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );

  const response = await fetch("https://api.github.com/users/pineladsn/repos");
  const data = await response.json();
  const reposName = data.map((repository: any) => repository.name);

  return {
    props: {
      repositoriesNames: reposName,
    },
  };
};

export default Home;
