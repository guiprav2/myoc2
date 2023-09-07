import Home from './Home.jsx';
import MyOC from './MyOC.jsx';
import SignIn from './SignIn.jsx';
import d from '@dominant/core';

class App {
  constructor() {
    this.updateRouter();
  }

  updateRouter() {
    switch (location.pathname.slice(1)) {
      case '': this.content = d.el(SignIn); break;
      case 'home': this.content = d.el(Home); break;
      case 'my-oc': this.content = d.el(MyOC); break;
    }
  }

  render = () => d.portal(() => this.content);
}

export default App;
