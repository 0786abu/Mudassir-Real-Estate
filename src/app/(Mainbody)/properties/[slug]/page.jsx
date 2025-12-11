
import BodyContent from "@/components/property/stickyTabOrClassic";
import FooterThree from "@/layout/footers/FooterThree";


export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property`, {
    cache: "force-cache", // ✅ recommended for SSG
  });
  const {properties} = await res.json();

  return properties?.map((property) => ({
    slug: property.slug,
  }));
}
const page = async({params}) => {
    const {slug} = await params;
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property/${slug}`,{ method:"GET", cache:"no-cache" });
    const propertyDetails = await data.json();
  return (
      <div>
      <BodyContent property={propertyDetails.data} relatedProperties={propertyDetails.relatedProperties} side={"right"} />
      <FooterThree />
      </div>
  );
};

export default page;
