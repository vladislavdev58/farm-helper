import React, {FC, useEffect, useRef} from 'react'

type MyProps = {
    textLink: string | JSX.Element
    id: string
    modalTitle: string
    textCloseBtn?: string
    closeFunc: () => void
}

export const Modals: FC<MyProps> = ({textLink, id, modalTitle, textCloseBtn = 'Закрыть', children, closeFunc}) => {
    const modalRef = useRef<any>()
    const options = {
        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: false,
        startingTop: '4%',
        endingTop: '10%',
        onCloseEnd: closeFunc
    }
    useEffect(() => {
        (window as any).M.Modal.init(modalRef.current, options)
    }, [modalRef])
    return (
        <>
            <a className="waves-effect waves-light btn modal-trigger" data-target={id}>{textLink}</a>
            <div className="modal" id={id} ref={modalRef}>
                <div className="modal-content">
                    <h4>{modalTitle}</h4>
                    {children}
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">{textCloseBtn}</a>
                </div>
            </div>
        </>
    )
}
