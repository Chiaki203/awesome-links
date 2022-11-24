import Head from 'next/head';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { AwesomeLink } from '../components/AwesomeLink';
import { links } from '../data/links';

const AllLinksQuery = gql`
  query allLinksQuery($first: Int, $after: String) {
    links(first:$first, after:$after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          index
          imageUrl
          url
          title 
          category
          description
          id
        }
      }
    }
  }
`

function Home() {
  const {user} = useUser()
  const {data, loading, error, fetchMore} = useQuery(AllLinksQuery, {
    variables: {first: 3}
  })
  if (!user) {
    return (
      <div className='flex items-center justify-center'>
        To view the awesome links you need to {' '}
        <Link href="/api/auth/login">
          <a className='block bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
            Login
          </a>
        </Link>
      </div>
    )
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>error: {error.message}</p>
  const {endCursor, hasNextPage} = data.links.pageInfo
  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className='container mx-auto max-w-5xl my-20 px-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' >
          {data?.links.edges.map(({node}, i) => (
            <Link key={i} href={`/link/${node.id}`}>
              <a>
                <AwesomeLink
                  // key={node.id}
                  title={node.title}
                  category={node.category}
                  url={node.url}
                  id={node.id}
                  description={node.description}
                  imageUrl={node.imageUrl}
                />
              </a>
            </Link>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded my-10'
            onClick={() => {
              fetchMore({
                variables: {after:endCursor},
                updateQuery: (prevResult, {fetchMoreResult}) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges
                  ]
                  return fetchMoreResult
                }
              })
            }}
          >
            more
          </button>
        ) : (
          <p className='my-10 text-center font-medium' >
            You've reached the end!{' '}
          </p>
        )}
      </div>
    </div>
  )
}

export default Home

// const AllLinksQuery = gql`
//   query {
//     links {
//       id
//       title
//       url
//       description
//       imageUrl
//       category
//     }
//   }
// `

// export default function Home() {
//   const {data, loading, error} = useQuery(AllLinksQuery)
//   if (loading) return <p>Loading...</p>
//   if (error) return <p>error: {error.message}</p>
//   return (
//     <div>
//       <Head>
//         <title>Awesome Links</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div className="container mx-auto max-w-5xl my-20">
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {data.links.map((link) => (
//             <AwesomeLink
//               key={link.id}
//               url={link.url}
//               id={link.id}
//               category={link.category}
//               title={link.title}
//               description={link.description}
//               imageUrl={link.imageUrl}
//             />
//             // <li key={link.id} className="shadow  max-w-md  rounded">
//             //   <img className="shadow-sm" src={link.imageUrl} />
//             //   <div className="p-5 flex flex-col space-y-2">
//             //     <p className="text-sm text-blue-500">{link.category}</p>
//             //     <p className="text-lg font-medium">{link.title}</p>
//             //     <p className="text-gray-600">{link.description}</p>
//             //     <a href={link.url} className="flex hover:text-blue-500">
//             //       {link.url.replace(/(^\w+:|^)\/\//, '')}
//             //       <svg
//             //         className="w-4 h-4 my-1"
//             //         fill="currentColor"
//             //         viewBox="0 0 20 20"
//             //         xmlns="http://www.w3.org/2000/svg"
//             //       >
//             //         <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
//             //         <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
//             //       </svg>
//             //     </a>
//             //   </div>
//             // </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
