'use babel';

import PlaygroundView from './playground-view';
import { CompositeDisposable } from 'atom';

export default {

  playgroundView: null,
  subscriptions: null,

  activate(state) {
    this.state = state
    this.playgroundView = new PlaygroundView();

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
    this.tile.destroy();
    this.tile = null;
  },

  serialize() {},

  toggle() {
    console.log('Playground was toggled!');
  },

  consumeStatusBar(statusBar) {
    this.tile = statusBar .addLeftTile({item: this.playgroundView.getElement(), priority: 10});
  }

};
