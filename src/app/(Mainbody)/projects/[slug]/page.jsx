import React, { Suspense } from 'react'
import ProjectDetail from './Project';
import ProfileLoader from '@/components/common/Loader';
import ProjectCTA from '@/components/property/Have_Project';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Fetch project data dynamically
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/${slug}`,
    { cache: "no-cache" }
  );
  const data = await res.json();
  const project = data?.project;

  const title = project
    ? `${project.title} | Pak Earth`
    : `Project Details | Pak Earth`;

  const description = project
    ? `Explore the ${project.projectTitle} project by Pak Earth in ${project?.location}. Features include ${project?.features?.plotFeatures?.join(
        ", "
      )}. Discover investment opportunities and modern real estate developments in Pakistan.`
    : `Detailed information about this Pak Earth real estate project. Learn about location, amenities, and investment options in Pakistan.`;

  const ogImage = project?.images[0]?.url || "/assets/images/about.webp";

  return {
    title,
    description,
    keywords: project
      ? [
          "Real estate Pakistan",
          "Residential project",
          "Commercial project",
          project.projectTitle,
          project.location,
          ...(project.keywords || []),
          "Property investment Pakistan",
          "Pak Earth projects",
        ]
      : ["Real estate Pakistan", "Property projects", "Pak Earth"],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${slug}`,
      siteName: "Pak Earth",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project?.title || "Pak Earth Real Estate Project",
        },
      ],
      type: "website",
    }
  };
}


const page = async({params}) => {
  const {slug} = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/${slug}`,{
    cache:"no-cache"
  });
  const data = await res.json()
  console.log(data)
  return (
    <div>
      <Suspense fallback={<ProfileLoader/>}>
        <ProjectDetail project={data?.project}/>
      </Suspense>
      <ProjectCTA/>
    </div>
  )
}

export default page