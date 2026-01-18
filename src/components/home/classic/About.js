import { GetAgents } from "@/utils/HomePageValues";
import ChildAgents from "./ChildAgents";


const About = async() => {
  const Agents = await GetAgents();
  return (
    <ChildAgents agents={Agents}/>
  );
};

export default About;
