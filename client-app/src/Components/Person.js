import React, { Component } from 'react';

class Person extends Component {
  static displayName = Person.name;

  constructor(props) {
    super(props);
    this.state = { persons: [], loading: true };
  }

  componentDidMount() {
    this.populatePersonData();
  }

  static renderPersonsTable(persons) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>PersonID</th>
            <th>Full name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
            {persons.map(person =>
                <tr key={person.personID}>
                    <td>{person.personID}</td>
                    <td>{person.fullName}</td>
                    <td>{person.address}</td>
                </tr>
            )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Person.renderPersonsTable(this.state.persons);

    return (
      <div>
        <h1 id="tableLabel">Person</h1>
        {contents}
      </div>
    );
  }

  async populatePersonData() {
    const response = await fetch('http://localhost:5209/api/Person');
    const data = await response.json();
    this.setState({ persons: data, loading: false });
  }
}
export default Person;