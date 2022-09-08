import { fetcher } from "../lib/api"
import Layout from "../components/layout";
import Bags from "../components/bags";
import useSWR from 'swr'

const BagList = ({bags}) => {
    //useSWR helps us enable pagination of our api data
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/bags?populate=*`, //first parameter
        fetcher, //second parameter
        {
            fallbackData: bags 
        } //third parameter. This is used to cached the data. The useSWR would send a request to the server to revalidate if there is an update in the data
    )
    console.log(data)
    return (
        <section>
            <h2>Bags</h2>
            <div>
                {data.data.map(item => {
                    console.log(item.attributes)
                })}
            </div>
        </section>
    )
}
// WAYS OF FETCHING /RENDERING AN API IN NEXT JS
//for server side rendering. What this means is that any code you put here would be executed by the server and not executed by the browser. We would be using getSeverSideProps for this because we want to use SWR(stale-while-revalidate) which is about client side rendering. essentially this is a pattern in NEXT Js that allows the HTTP chache valdation strategy to be done automatically by NEXT Js. This would allow returning of a data if it is cached if it is there and also send a request that would revalidate the data and would come back for an up to date data. After determining the type of fetching you want to use then you would have to do take the following steps. (1) create a .env file in your root folder (2) create a folder in your root folder and name it lib then create an api.js file in it and then make the request. To see a result you would have to restart your server because of the .env file you created.

// export async function getServerSideProps() {
    
// }

//another option for rendering an API is getStaticProps. Thsi is for static site generation. In this case the data to be used for the page would be available to the user at build time ahead of the user request and data can come from an headless CMS for example
export async function getStaticProps() {
    const bagsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/bags?populate=*`);
    // console.log(process.env.NEXT_PUBLIC_STRAPI_URL)
    return {
        props: {
            bags: bagsResponse
        }
    }
}

//another option is to use the fetch API with the useEffect in react.

export default BagList