import SignIn from './SignIn.jsx';
import d from '@dominant/core';

class App {
  constructor() {
    this.updateRouter();
  }

  updateRouter() {
    switch (location.pathname.slice(1)) {
      case '': this.content = d.el(SignIn); break;
    }
  }

  render = () => d.portal(() => this.content);
}

export default App;
