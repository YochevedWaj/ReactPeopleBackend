import React from 'react';
import axios from 'axios';
import AddPersonForm from './AddPersonForm';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
            id: ''
        },
        isEditing: false
    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({
                people: res.data,
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                },
            });
        });
    }

    componentDidMount() {
        axios.get('/api/people/getall').then(this.loadPeople);
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onAddClick = () => {
        axios.post('/api/people/addperson', this.state.person).then(this.loadPeople);
    }

    onEditClick = p => {
        this.setState({ person: p, isEditing: true });
    }

    onDeleteClick = id => {
        axios.post('/api/people/deleteperson', { id }).then(this.loadPeople);
    }

    onUpdateClick = p => {
        axios.post('/api/people/editperson', p).then(this.loadPeople);
        this.onCancelClick();
    }

    onCancelClick = () => {
        this.setState({ person: { firstName: '', lastName: '', age: '' },  isEditing: false })
    }

    render() {
        const { person, people, isEditing } = this.state;
        return (
            <div className='container mt-5'>
                <AddPersonForm
                    person={person}
                    onTextChange={this.onTextChange}
                    onAddUpdateClick={isEditing ? () => this.onUpdateClick(person) : this.onAddClick}
                    isEditing={isEditing}
                    onCancelClick={this.onCancelClick}/>
                <table className='table table-hover table-bordered table-striped'>
                    <thead>
                        <tr>
                            <td style={{ width: 15 }}>
                                <button className='btn btn-danger btn-block'>Delete</button>
                                <button className='btn btn-info btn-block'>Check all</button>
                                <button className='btn btn-info btn-block'>Uncheck all</button>
                            </td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Edit/Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <PersonRow
                            person={p}
                            key={p.id}
                            onEditClick={() => this.onEditClick(p)}
                            onDeleteClick={() => this.onDeleteClick(p.id)}
                        />)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default PeopleTable;