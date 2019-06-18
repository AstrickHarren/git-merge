'use babel';

import PlaygroundView from './playground-view';
import { CompositeDisposable } from 'atom';

export default {

  playgroundView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.playgroundView = new PlaygroundView(state.playgroundViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.playgroundView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'playground:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.playgroundView.destroy();
  },

  serialize() {
    return {
      playgroundViewState: this.playgroundView.serialize()
    };
  },

  toggle() {
    console.log('Playground was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
