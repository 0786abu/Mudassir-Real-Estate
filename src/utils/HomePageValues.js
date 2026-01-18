
export const GetSponsoredProjects = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`,{
    cache:"no-cache"
  });
  const data = await res.json();
  const {projects} = data;
  return projects
}
export const GetLatestProperties = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property`,{
    cache:"no-cache"
  });
  const data = await res.json();
  const {properties} = data;
  return properties
}
export const GetFeaturedProperties = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/FeaturedProperties`,{
    cache:"no-cache"
  });
  const data = await res.json();
  const {featuredProperties} = data;
  return featuredProperties
}
export const GetAdminProperties = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/property/adminProperties`,{
    cache:"no-cache"
  });
  const data = await res.json();
  const {properties} = data;
  return properties
}
export const GetAgents = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agents/getAgents`,{
    cache:"no-cache"
  });
  const data = await res.json();
  const {agents} = data;
  return agents
}