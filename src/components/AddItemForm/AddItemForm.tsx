import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

export type AddItemFormPropsType = {
  addItem: (itemTitle: string) => void
  disabled?: boolean
}

const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, disabled = false}) => {
  console.log('AddItemForm')

  let [itemTitle, setItemTitle] = useState('');
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === 'Enter') {
      onAddItemHandler()
    }
  }
  const onAddItemHandler = () => {
    if (itemTitle.trim()) {
      addItem(itemTitle);
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
                 error={!!error} helperText={error}
                 disabled={disabled}/>
      <IconButton onClick={onAddItemHandler}
                  color={'primary'}
                  disabled={disabled}>
        <AddBox/>
      </IconButton>

    </div>
  )
})

export default AddItemForm;