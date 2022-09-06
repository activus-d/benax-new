//this file would be a parameter that would change based on what we oout in the parameter of the url. We can use it in a way that we allow next js pre-generate all the pages and make them available at build time. However we would not be using this because we need to add an aditional logic to this page where we need to ensure that a jason web token is in place. This is because at build time we don't know if a person is logged in or not. So we have to result to serside rendering with serverSideProps.
import { fetcher } from "../../lib/api";

const Bag = ({bag}) => {
    // console.log(bag)
    return (
        <section>
            <h1>{bag.attributes.product_name}</h1>
        </section>
    )
}

//how do we grab the actual value from the root and make a request to strapi and the way we are gong to do that is like this:
export async function getServerSideProps({ params }) {
    const { slug } = params; //the only reason we can access slug from params(parameter) is that we named our dynamic file slug. If we use any other name then it is that name that would be used to access the params.
    console.log(params)
    const bagResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/bag/${slug}`)//to use the slug field as endpoint to find items in your collection you have to install the plugin slugify and configure it in your strapi backend code to recognize the slug fields as endpoint in your API request
    console.log(bagResponse)
    return {
        props: {
            bag: bagResponse.data
        }
    }
}


export default Bag