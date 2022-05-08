import React from 'react';

export default function PersonRow({ person, key, onDeleteClick, onEditClick }) {
    const { firstName, lastName, age, id } = person;
    return (
        <tr key={key}>
            <td>
                <input type='checkbox' className='form-control' />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button onClick={onEditClick}className='btn btn-warning' name={id}>Edit</button>
                <button onClick={onDeleteClick} className='btn btn-danger' name={id}>Delete</button>
            </td>
        </tr>
    )

};