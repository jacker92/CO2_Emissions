import React, { Component } from 'react';
import {
  sortableContainer,
  sortableElement
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { classes } from 'istanbul-lib-coverage';
import './App.css';

const SortableItem = sortableElement(({ value, onRemove }) => (
  <li>
    {value}
   <span>  </span>
    <button className="removeButton" onClick={() => onRemove(value)}>Remove</button>
  </li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

class SortableComponent extends Component {

  state = {
    items: this.props.data,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));

    this.props.onSorted(this.state.items);
  };

   onRemove = (value) => {
     this.props.onRemove(value);
    };

  render() {
    const { items } = this.state;

    return (
      <SortableContainer helperClass='sortableHelper' onSortEnd={this.onSortEnd}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} onRemove={this.onRemove}/>
        ))}
      </SortableContainer>
    );


  }
}

export default SortableComponent
