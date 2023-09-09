import CreateOC from './CreateOC.jsx';
import Home from './Home.jsx';
import MyOC from './MyOC.jsx';
import OC from './OC.jsx';
import SignIn from './SignIn.jsx';
import SubmitWork from './SubmitWork.jsx';
import d from '@dominant/core';

class App {
  constructor() {
    this.updateRouter();
  }

  updateRouter() {
    let path = location.pathname.slice(1);
    if (path.startsWith('myoc2/')) { path = path.slice('myoc2/'.length) }

    switch (path) {
      case '': this.content = d.el(SignIn); break;
      case 'home': this.content = d.el(Home); break;
      case 'my-oc': this.content = d.el(MyOC); break;
      case 'oc': this.content = d.el(OC); break;
      case 'create-oc': this.content = d.el(CreateOC); break;
      case 'submit-work': this.content = d.el(SubmitWork); break;
    }
  }

  render = () => d.portal(() => this.content);
}

export default App;
