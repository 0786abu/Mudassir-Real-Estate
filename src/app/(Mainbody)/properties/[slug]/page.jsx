
import BodyContent from "@/components/property/stickyTabOrClassic";

export async function generateMetadata({ params }) {
  const { slug } = params;

  // Fetch property data dynamically
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property/${slug}`,
    { cache: "no-cache" }
  );
  const data = await res.json();
  const property = data?.data;

  // Fallbacks
  const title = property
    ? `${property.title} in ${property.city} | Pak Earth`
    : `Property Details | Pak Earth`;

  const description = property
    ? `Explore the ${property.title} property by Pak Earth in ${property.city}. Features include ${property.features?.join(
        ", "
      )}. Find residential or commercial properties for sale or rent with modern amenities and investment opportunities in Pakistan.`
    : `Detailed information about this Pak Earth property. Learn about location, amenities, price, and investment options in Pakistan.`;

  const ogImage = property?.images?.[0]?.url || "/assets/images/about.webp";

  return {
    title,
    description,
    keywords: property
      ? [
          "Real estate Pakistan",
          "Properties for sale Pakistan",
          "Properties for rent Pakistan",
          property.title,
          property.city,
          "Pak Earth",
          ...(property.keywords || []),
        ]
      : ["Real estate Pakistan", "Property listings", "Pak Earth"],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${slug}`,
      siteName: "Pak Earth",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: property?.title || "Pak Earth Property",
        },
      ],
      type: "website",
    }
  };
}


const page = async({params}) => {
    const {slug} = await params;
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property/${slug}`,{ method:"GET", cache:"no-cache" });
    const propertyDetails = await data.json();
  return (
      <div>
      <BodyContent property={propertyDetails.data} relatedProperties={propertyDetails.relatedProperties} side={"right"} />
      </div>
  );
};

export default page;
