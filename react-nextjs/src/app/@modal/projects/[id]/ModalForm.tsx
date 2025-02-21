"use client"
import React, { useState, useEffect, Suspense } from "react";
import { Modal, Spin } from "antd";
import { useRouter } from "next/navigation";

const EditForm = React.lazy(() => import( "./EditForm" ));


const ModalForm = ({ projectId }: { projectId: number | undefined }) => {
  const [ domLoaded, setDomLoaded ] = useState( false ),
        [ isModalOpen, setIsModalOpen ] = useState( true );

  const router = useRouter(),

        onClose = () => {
            setIsModalOpen( false );
            router.push( "/projects" );
        };

    useEffect(() => {
        setDomLoaded(true);
    }, []);


  return domLoaded && (
    <>
      <Modal title={ projectId  ? `Edit record` : `New record` }
        closable={ true } 
        open={ isModalOpen } 
        onCancel={ onClose } 
        footer={ null }
        forceRender={ true }>
        <Suspense fallback={ <Spin size="large" /> }>
            <EditForm projectId={ projectId } onClose={ onClose } />
        </Suspense>
      </Modal>
    </>
  );
};

export default ModalForm;