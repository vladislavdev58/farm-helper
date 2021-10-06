import React, {FC, useContext, useEffect, useRef} from 'react'
import CornStore from '../store/CornStore'
import StoreContext from '../context/StoreContext'

type MyProps = {
    textLink: string | JSX.Element
    id: string
    modalTitle: string
    textCloseBtn?: string
}

export const Modals: FC<MyProps> = ({textLink, id, modalTitle, textCloseBtn = 'Закрыть', children}) => {
    const stores = useContext(StoreContext)
    const modalRef = useRef<any>()
    const btnCloseRef = useRef<any>()
    const options = {
        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: false,
        startingTop: '4%',
        endingTop: '10%',
    }
    useEffect(() => {
        const instance = (window as any).M.Modal.getInstance(modalRef.current)
        if (instance) {
            instance.close()
        }
        (window as any).M.Modal.init(modalRef.current, options)
        // eslint-disable-next-line
    }, [stores?.cornStore.allCorn])

    useEffect(() => {
        const btn = btnCloseRef.current
        return () => {
            btn.click()
        }
    }, [])
    return (
        <>
            <span className="waves-effect waves-light btn modal-trigger" data-target={id}>{textLink}</span>
            <div className="modal" id={id} ref={modalRef}>
                <div className="modal-content">
                    <h4>{modalTitle}</h4>
                    {children}
                </div>
                <div className="modal-footer">
                    <span className="modal-close waves-effect waves-green btn-flat" ref={btnCloseRef}>{textCloseBtn}</span>
                </div>
            </div>
        </>
    )
}
