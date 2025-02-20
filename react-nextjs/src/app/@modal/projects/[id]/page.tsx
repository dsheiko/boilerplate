import ModalForm from "./ModalForm";

export default async function ProjectsModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  return <ModalForm projectId={ parseInt( projectId, 10 ) }/>;
}