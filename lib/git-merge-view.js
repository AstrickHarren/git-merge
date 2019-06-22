'use babel';

const Git = require('./git-command-util');

export default class GitMergeView {

  constructor() {
    // create roots
    this.element = document.createElement('div');
    this.element.classList.add('inline-block', 'icon-block');

    this.icon = document.createElement('span');
    this.icon.classList.add('github-BranchMenuView-item', 'icon' ,'icon-git-merge')
    this.banner = document.createElement('div');
    this.banner.textContent = 'Merge';
    this.banner.classList.add('inline-block');

    this.element.appendChild(this.icon);
    this.element.appendChild(this.banner);

    // this.element.addEventListener('click', () => {this.updateSelection(this.select)});
    this.selection = document.createElement('div');
    this.selection.classList.add('github-BranchMenuView-selector')

    // fill selection
    this.select = document.createElement('select');
    this.select.classList.add('inline-block', 'input-select', 'github-BranchMenuView-select', 'github-BranchMenuView-item');
    this.btn = document.createElement('div');
    this.btn.textContent = 'Merge';
    this.btn.classList.add('btn', 'inline-block', 'github-BranchMenuView-item');
    this.btn.addEventListener('click', () => Git.merge(this.select.value));

    this.selection.appendChild(this.icon.cloneNode(true));
    this.selection.appendChild(this.select);
    this.selection.appendChild(this.btn);


    this.tooltip = atom.tooltips.add(this.element, {
      item: this.selection,
      trigger: 'click',
      class: 'github-StatusBarTileController-tooltipMenu'
    })

    this.element.addEventListener('click', () => {this.updateSelection(this.select)});
  }

  updateSelection(select) {
    const branches = Git.getBranch();
    select.innerHTML = '';

    for (branch of branches) {
      let alter = document.createElement('option');
      alter.textContent = branch;
      select.appendChild(alter);
    }

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
