import React from 'react';
import axios from 'axios';
import AddPersonForm from './AddPersonForm';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {
    state = {
        people: [],
        checkedPeople: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
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

    componentDidMount = () => {
        this.loadPeople();
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

    onUpdateClick = () => {
        axios.post('/api/people/editperson', this.state.person).then(this.loadPeople);
        this.onCancelClick();
    }

    onCancelClick = () => {
        this.setState({ person: { firstName: '', lastName: '', age: '' },  isEditing: false })
    }

    onCheck = id => {
        const checkedPeople = this.state.checkedPeople;
        const copy = [...checkedPeople, id];
        this.setState({ checkedPeople: copy });
        console.log(copy);
    }

    onUncheck = i => {
        const checkedPeople = this.state.checkedPeople;
        const copy = checkedPeople.filter(id => id !== i);
        this.setState({ checkedPeople: copy });
    }

    onCheckBoxChange = id => {
        if (this.state.checkedPeople.includes(id)) {
            this.onUncheck(id);
        } else {
            this.onCheck(id);
        }
    }

    onCheckAll = () => {
        const { people } = this.state;
        this.setState({ checkedPeople: people.map(p => p.id) });
    }

    onUncheckAll = () => {
        this.setState({ checkedPeople: []});
    }

    onDeleteAllClick = () => {
        axios.post('/api/people/deletemany', this.state.checkedPeople).then(this.loadPeople);
        this.setState({ checkedPeople: [] });
    }

    allChecked = () => {
        const { people, checkedPeople } = this.state;
        return people.every(p => checkedPeople.includes(p.id));
    }
    render() {
        const { person, people, isEditing, checkedPeople } = this.state;
        return (
            <div className='container mt-5'>
                <AddPersonForm
                    person={person}
                    onTextChange={this.onTextChange}
                    onAddUpdateClick={isEditing ? this.onUpdateClick : this.onAddClick}
                    isEditing={isEditing}
                    onCancelClick={this.onCancelClick}/>
                <table className='table table-hover table-bordered table-striped'>
                    <thead>
                        <tr>
                            <td style={{ width: 15 }}>
                                <button onClick={this.onDeleteAllClick} className='btn btn-danger btn-block'>Delete</button>
                                <div className='mt-2'>
                                    <input type='checkbox' checked={this.allChecked()} onChange={this.allChecked() ? this.onUncheckAll : this.onCheckAll} className='form-control'></input>
                                </div>
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
                            onCheckBoxChange={() => this.onCheckBoxChange(p.id)}
                            isChecked={checkedPeople.includes(p.id)}
                        />)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default PeopleTable;