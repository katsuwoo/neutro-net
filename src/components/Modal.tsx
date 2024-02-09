import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type ModalType = {
  title: string
  isShown: boolean
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  closeClick: React.MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  backShown?: boolean
  onBackClick?: React.MouseEventHandler<HTMLButtonElement>
  select?: {
    label: string
    handler: React.MouseEventHandler<HTMLButtonElement>
  }
}

const Modal: React.FC<ModalType> = (props) => {
  if (typeof document !== 'undefined') {
    if (props.isShown ) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }
  return (
    <>
      <div className={`fixed top-0 left-0 h-full w-screen transform ${props.isShown ? '' : 'translate-y-full'} transition-transform ease-in-out duration-200 overflow-hidden z-50`} onClick={(e) => {
        if (e.target == e.currentTarget) {
          props.setIsShown(false)
        }
      }}>
        <div className="flex flex-col bg-white fixed w-screen h-full md:w-4/5 md:h-4/5 md:top-[10%] md:left-[10%] md:rounded-lg md:overflow-hidden">
          <div className="flex flex-col justify-center text-center align-center align-middle border-b w-full min-h-12 bg-white rounded-t-lg">
            <h2 className='text-center align-middle align-center m-0 py-auto text-xl'>{props.title}</h2>
            <div className="absolute top-0 right-0 w-12 h-12 flex flex-col justify-center items-center">
              <button className="border-none p-0 bg-transparent" onClick={props.closeClick}>
                <FontAwesomeIcon icon={faTimes} className="h-6 text-gray-700" />
              </button>
            </div>
          </div>
          <div className="h-full overflow-y-scroll overflow-x-hidden">
            {props.children}
          </div>
          {props.select && <button className="w-full bg-blue-500 text-center py-4 md:rounded-b-lg text-white text-lg" onClick={props.select.handler}>
            {props.select.label}
          </button>}
        </div>
      </div>
      {props.isShown ? <div className="fixed top-0 left-0 h-full w-full bg-gray-700 opacity-50" /> : <></>}
    </>
  )
}
export default Modal