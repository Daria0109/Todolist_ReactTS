import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddBox, ControlPoint, TextFields} from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (itemTitle: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
  let [itemTitle, setItemTitle] = useState('');
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setItemTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('');
    if (e.key === 'Enter') {
      onAddItemHandler()
    }
  }
  const onAddItemHandler = () => {
    if (itemTitle.trim()) {
      props.addItem(itemTitle);
      setItemTitle('');
    } else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <TextField value={itemTitle}
                 variant={'outlined'}
                 label={'Title'}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 className={error ? 'error' : ''}
                 error={!!error} helperText={error}/>
      <IconButton onClick={onAddItemHandler}
              color={'primary'}>
        <AddBox/>
      </IconButton>

    </div>
  )
}

export default AddItemForm;