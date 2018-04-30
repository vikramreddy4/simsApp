import React, { Component } from "react";
import FilterableContactTable from "./FilterableContactTable";

var CONTACTS = [
  {name: 'Tom Jackson', phone: '555-444-333', email: 'tom@gmail.com'},
  {name: 'Mike James', phone: '555-777-888', email: 'mikejames@gmail.com'},
  {name: 'Janet Larson', phone: '555-222-111', email: 'janetlarson@gmail.com'},
  {name: 'Clark Thompson', phone: '555-444-333', email: 'clark123@gmail.com'},
  {name: 'Emma Page', phone: '555-444-333', email: 'emma1page@gmail.com'},

];


export default class ContactsList extends Component {
    render() {
        return (
          <FilterableContactTable contacts={CONTACTS} />
        );
    }
}
