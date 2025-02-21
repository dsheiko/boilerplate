import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";

import ProjectTable from "./ProjectTable";
import { projectModel } from "@/utils/model";
import { PAGE_PROJECTS } from "@/utils/constants";

export const dynamicParams = false;

export default async function Projects() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ PAGE_PROJECTS ],
    queryFn:  () => projectModel.findAll(),
  });

  return (
    <div>
      <HydrationBoundary state={ dehydrate( queryClient ) }>
        <ProjectTable />
      </HydrationBoundary>
    </div>
  );
}
