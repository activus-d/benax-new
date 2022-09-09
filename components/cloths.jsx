import Link from 'next/link'


export default function Bags({cloths}) {
    return(
        <ul>
            {cloths && cloths.data.map(cloth => {
                return <li key={cloth.id}>
                    <Link href={`cloth/` + cloth.attributes.slug}>{cloth.attributes.product_name}</Link>
                </li>
            })}
        </ul>
    )
}