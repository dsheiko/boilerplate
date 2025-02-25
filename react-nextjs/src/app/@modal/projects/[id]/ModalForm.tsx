"use client"
import React, { useState, Suspense } from "react";
import { ConfigProvider, Modal, Spin } from "antd";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const EditForm = React.lazy(() => import( "./EditForm" ));


const ModalForm = ({ projectId }: { projectId: number | undefined }) => {
  const [ isModalOpen, setIsModalOpen ] = useState( true );

  const router = useRouter(),

        onClose = () => {
            setIsModalOpen( false );
            router.push( "/projects" );
        };

  return createPortal((
    <ConfigProvider theme={{ token: { motion: false }}}>
      <Modal title={ projectId  ? `Edit record` : `New record` }
        closable={ true } 
        open={ isModalOpen } 
        onCancel={ onClose } 
        footer={ null }
        destroyOnClose={ false }
        forceRender={ true }>
        <Suspense fallback={ <Spin size="large" /> }>
            <EditForm projectId={ projectId } onClose={ onClose } />
        </Suspense>
      </Modal>
    </ConfigProvider>
  ), document.getElementById( "modal-root")! );
};

export default ModalForm;