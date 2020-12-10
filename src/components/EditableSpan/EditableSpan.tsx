import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';


export type EditableSpanPropsType = {
  title: string
  editTitle: (editedTitle: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log('EditableSpan')

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.editTitle(title)
  }
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
  }

  return (
    editMode ?
      <TextField autoFocus
                 value={title}
                 onChange={onChangeTitle}
                 onBlur={activateViewMode}/> :
      <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
})

export default EditableSpan;