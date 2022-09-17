import Script from 'next/script'

export default function success() {
    return (
        <section>
            <script type="text/javascript" src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js" > </script>
            SUCCESS
        </section>
    )
}