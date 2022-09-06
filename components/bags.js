import Link from 'next/link'


export default function Bags({bags}) {
    return(
        <ul>
            {bags && bags.data.map(bag => {
                return <li key={bag.id}>
                    <Link href={`bag/` + bag.attributes.slug}>{bag.attributes.product_name}</Link>
                </li>
            })}
        </ul>
    )
}