import d from '@dominant/core';

class Menu {
  open = () => {
    let menu = document.querySelector('.menu');
    menu.classList.remove('hidden');
    setTimeout(() => menu.classList.add('opacity-100'), 10);
  };

  close = ev => {
    if (ev.target.classList.contains('menu')) {
      let menu = document.querySelector('.menu');
      menu.classList.remove('opacity-100');
      setTimeout(() => menu.classList.add('hidden'), 300);
    }
  };

  render = () => (
    <div
      class="hidden top-0 z-20 bottom-0 bg-[#2D2829D4] fixed w-screen max-w-4xl opacity-0 transition-all menu"
      onClick={ev => this.close(ev)}
    >
        <div class="h-full bg-[#2D2829] px-12 py-32 flex flex-col gap-8 w-96 text-[#FA3973C2]">
            <div class="flex items-center gap-4">
                <div class="bg-[#A7A7A7] w-16 h-16 shrink-0 rounded-full"></div>
                <div class="">
                  User Name
                </div>
            </div>
            <div class="border-b border-[#E3D9D9BD]"></div>
            <div class="flex gap-8 items-center">
                <div class="ml-8 nf nf-md-plus_box text-[#A7A7A7] text-xl"></div>
                <div class="">
                    Submit Work
                </div>
            </div>
            <div class="flex gap-8 items-center">
                <div class="ml-8 nf nf-fa-user_circle text-[#A7A7A7] text-xl"></div>
                <div class="">
                    My OC
                </div>
            </div>
            <div class="flex gap-8 items-center">
                <div class="ml-8 nf nf-md-image_area text-[#A7A7A7] text-xl"></div>
                <div class="">
                    Gallery
                </div>
            </div>
            <div class="border-b border-[#E3D9D9BD]"></div>
            <div class="flex gap-8 items-center">
                <div class="ml-8 nf nf-cod-question text-[#A7A7A7] text-xl"></div>
                <div class="">
                    Help
                </div>
            </div>
            <div class="flex gap-8 items-center">
                <div class="ml-8 nf nf-md-cog text-[#A7A7A7] text-xl"></div>
                <div class="">
                    Settings
                </div>
            </div>
        </div>
    </div>
  );
}

export default Menu;