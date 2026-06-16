"use client"
import React, { Suspense } from "react";
import { ConfigProvider, Modal, Spin } from "antd";
import { useRouter } from "next/navigation";
import useIsMounted from "@/utils/hooks/useIsMounted";

const EditForm = React.lazy( () => import( "./EditForm" ) );

const ModalForm = ( { projectId }: { projectId: number | undefined } ) => {
  const isMounted = useIsMounted();
  const router = useRouter();

  const onClose = () => {
    router.push( "/projects", { scroll: false } );
  };

  if ( !isMounted ) { return null; }

  return (
    <ConfigProvider theme={ { token: { motion: false } } }>
      <Modal
        title={ projectId ? `Edit record` : `New record` }
        closable={ true }
        open={ true }
        onCancel={ onClose }
        footer={ null }
        destroyOnHidden={ false }
        forceRender={ true }
      >
        <Suspense fallback={ <Spin size="large" /> }>
          <EditForm projectId={ projectId } onClose={ onClose } />
        </Suspense>
      </Modal>
    </ConfigProvider>
  );
};

export default ModalForm;
