import React from 'react';

export default function PersonRow({ person, key, onDeleteClick, onEditClick, isChecked, onCheckBoxChange }) {
    const { firstName, lastName, age } = person;
    return (
        <tr key={key}>
            <td>
                <input onChange={onCheckBoxChange} type='checkbox' checked={isChecked} className='form-control' />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button onClick={onEditClick}className='btn btn-warning'>Edit</button>
                <button onClick={onDeleteClick} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    )

};