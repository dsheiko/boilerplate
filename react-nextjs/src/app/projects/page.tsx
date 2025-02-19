import ProjectTable from "./ProjectTable";
import { projectModel } from "@/utils/model";

export default async function Home() {
  const dataSource = await projectModel.findAll();
  return (
    <div>
      <ProjectTable dataSource={ dataSource } />
    </div>
  );
}
