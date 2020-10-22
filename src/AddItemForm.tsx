import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

function AddItemForm (props: AddItemFormPropsType) {
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
            setError('Text is required')
        }
    }

    return (
        <div>
            <input value={itemTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={onAddItemHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
export default AddItemForm;