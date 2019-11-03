import React, { Component } from 'react';
import {
  sortableContainer,
  sortableElement
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { classes } from 'istanbul-lib-coverage';
import './App.css';

const SortableItem = sortableElement(({ value }) => (
  <li>
    {value}
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
  };

  render() {
    const { items } = this.state;

    return (
      <SortableContainer helperClass='sortableHelper' onSortEnd={this.onSortEnd}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </SortableContainer>
    );


  }
}

export default SortableComponent
