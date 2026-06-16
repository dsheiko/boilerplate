import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ModalForm from "./ModalForm";
import { projectModel } from "@/utils/model";
import { PAGE_PROJECTS } from "@/utils/constants";

export const dynamic = "force-dynamic";

export default async function ProjectModal( {
  params,
}: {
  params: Promise<{ id: string }>;
} ) {
  const projectId = parseInt( ( await params ).id, 10 ),
        queryClient = new QueryClient();

  if ( projectId ) {
    await queryClient.prefetchQuery( {
      queryKey: [ PAGE_PROJECTS, projectId ],
      queryFn:  () => projectModel.find( projectId ),
    } );
  }

  return (
    <HydrationBoundary state={ dehydrate( queryClient ) }>
      <ModalForm projectId={ projectId } />
    </HydrationBoundary>
  );
}
