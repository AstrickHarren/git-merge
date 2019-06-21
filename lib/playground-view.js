'use babel';

const Git = require('./git-command-util');

export default class PlaygroundView {

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('inline-block', 'icon-block');
    this.element.textContent = 'Merge';

    this.selection = document.createElement('div');
    for (branch of ['master', 'test']) {
      var alter = document.createElement('button');
      alter.textContent = branch;
      alter.classList.add('btn');
      this.selection.appendChild(alter);
    }

    // for (child of this.selection.children) {
    //   child.addEventListener('click', () => {Git.merge(child.textContent)});
    // }

    for (let i = 0; i < this.selection.children.length; i++) {
      this.selection.children[i].addEventListener('click', () => {Git.merge(this.selection.children[i].textContent)});
    }

    this.tooltip = atom.tooltips.add(this.element, {
      item: this.selection,
      trigger: 'click',
      class: 'selection-view'
    })

  }

  serialize() {}


  destroy() {
    this.element.remove();
    this.tooltip.dispose();
  }


  getElement() {
    return this.element;
  }

}
