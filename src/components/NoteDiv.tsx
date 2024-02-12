import React from 'react';

const NoteDiv: React.FC<{errMessage: string, msgLength: number, maxLength: number}> = ({
  errMessage, msgLength, maxLength
}) => {
  return (
    <div className="flex justify-between px-2">
      <ErrP errMessage={errMessage} />
      <span className="text-xs">{`${msgLength} /${maxLength} 文字`}</span>
    </div>
  )
}

export default NoteDiv;

export const ErrP: React.FC<{errMessage: string}> = ({errMessage}) => {
  return <p className="m-0 mb-2 text-red-400 text-xs">{errMessage}</p>
}