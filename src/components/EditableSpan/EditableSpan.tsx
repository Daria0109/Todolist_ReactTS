import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@material-ui/core';


export type EditableSpanPropsType = {
  title: string
  editTitle: (editedTitle: string) => void
  notEdited: boolean
}

const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({title, editTitle, notEdited}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.currentTarget.value)
  }
  const activateViewMode = () => {
    setEditMode(false);
    editTitle(editedTitle)
  }
  const activateEditMode = () => {
    if (notEdited) return;
    setEditMode(true);
    setEditedTitle(editedTitle)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }

  return (
    editMode ?
      <TextField autoFocus
                 value={editedTitle}
                 onChange={onChangeTitle}
                 onBlur={activateViewMode}
                 onKeyPress={onKeyPressHandler}/> :
      <span onDoubleClick={activateEditMode}>{title}</span>
  )
})

export default EditableSpan;