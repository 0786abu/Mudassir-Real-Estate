
import BodyContent from "@/components/property/stickyTabOrClassic";
import FooterThree from "@/layout/footers/FooterThree";


export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/property/create-property`,
      { cache: "force-cache" }
    );

    const json = await res.json();

    if (!Array.isArray(json.properties)) {
      return []; // ✅ VERY IMPORTANT
    }

    return json.properties.map((property) => ({
      slug: property.slug,
    }));
  } catch (error) {
    return []; // ✅ build kabhi fail nahi hogi
  }
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
