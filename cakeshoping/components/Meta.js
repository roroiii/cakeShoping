import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'CAKESHOP 蛋糕很香',
  keywords: 'cake, 蛋糕, 手作甜點',
  description: '手作甜點與蛋糕，好吃一口接一口，聞起來很香。',
};

export default Meta;
