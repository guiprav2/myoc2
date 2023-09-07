import d from '@dominant/core';

class SignIn {
  _currentTab = 'welcome';
  get currentTab() { return this._currentTab }
  set currentTab(x) { this._currentTab = x; this.updateTabs() }

  setup = () => {
    this.pageTabsEl = this.root.querySelector('.page-tabs');
    this.updateTabs();

    for (let x of this.root.querySelectorAll('[class*="action:"]')) {
      let name = [...x.classList].find(x => x.startsWith('action:')).slice('action:'.length);
      x.addEventListener('click', ev => this.actions[name](ev));
    }
  };

  updateTabs() {
    for (let x of this.pageTabsEl.querySelectorAll('[class*="tab:"]')) {
      x.classList.add('hidden');
    }

    this.pageTabsEl.querySelector(`.tab\\:${this.currentTab}`).classList.remove('hidden');
  }

  actions = {
    'sign-in': () => {
      this.root.classList.remove('bg-[#2D2829]');
      this.root.classList.add('bg-neutral-100');
      this.currentTab = 'sign-in';
    },

    'sign-in-submit': async () => {
      let errorMsgEl = this.root.querySelector('.sign-in-error-msg');
      errorMsgEl.classList.add('hidden');

      let email = this.root.querySelector('[name="email"]').value;
      let pwd = this.root.querySelector('[name="password"]').value;

      let res = await fetch(`https://protohub.guiprav.com/myoc/users?email=${email}&pwd=${pwd}`);
      let data = await res.json();

      if (!data || !data.length) {
        errorMsgEl.textContent = 'Wrong e-mail or password';
        errorMsgEl.classList.remove('hidden');
        return;
      }

      alert('signed in!');
    },

    'sign-up': () => {
      this.root.classList.remove('bg-[#2D2829]');
      this.root.classList.add('bg-neutral-100');
      this.currentTab = 'sign-up';
    },

    'go-back': () => {
      this.root.classList.remove('bg-neutral-100');
      this.root.classList.add('bg-[#2D2829]');
      this.currentTab = 'welcome';
    },
  };

  render = () => this.root = (
    <div class="flow-root h-screen sans bg-[#2D2829] overflow-auto text-[#CBCBCB]" onAttach={this.setup}>
      <div class="max-w-4xl mx-auto mt-[25vh]">
        <div class="text-center text-[#FA3973] font-6xl">My OC</div>
        <div class="page-tabs">
          <div class="tab:welcome">
            <div class="text-center mt-24">
              <button class="px-5 py-3 w-72 bg-[#FA3973] text-white action:sign-in">Sign In</button>
            </div>
            <div class="text-center my-12">
              <a class="text-center mt-12 action:sign-up" href="#">Create Account</a>
            </div>
          </div>
          <div class="tab:sign-in">
            <div class="flex flex-col items-center gap-2 mt-12">
              <input class="w-72 px-5 py-2 outline-none" name="email" />
              <input class="w-72 px-5 py-2 outline-none" type="password" name="password" />
              <div class="sign-in-error-msg hidden italic text-red-500"></div>
              <button class="px-5 py-3 w-72 bg-[#FA3973] text-white rounded-full mt-2 action:sign-in-submit">Sign In</button>
              <a class="text-center mt-12 text-neutral-700 action:go-back" href="#">Go back</a>
            </div>
          </div>
          <div class="tab:sign-up">
            <div class="flex flex-col items-center gap-2 mt-12">
              <input class="w-72 px-5 py-2 outline-none" />
              <input class="w-72 px-5 py-2 outline-none" />
              <input class="w-72 px-5 py-2 outline-none" />
              <button class="px-5 py-3 w-72 bg-[#FA3973] text-white rounded-full mt-2 action:sign-up-submit">Create Account</button>
              <a class="text-center mt-12 text-neutral-700 action:go-back" href="#">Go back</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
