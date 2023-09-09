import d from '@dominant/core';

class Home {
  setup = () => {
    this.root.querySelector('.section\\:gallery').append(this.renderGallery());
    this.loadData();
  };

  async loadData() {
    let res = await fetch(`https://protohub.guiprav.com/myoc/works`);
    let data = await res.json();
    if (!data || !data.length) { alert('Failed to load'); return }
    this.gallery = data.slice(0, 20);
    d.update();
  }

  render = () => this.root = (
    <div class="flow-root h-screen overflow-auto sans text-[#2D2829] bg-neutral-200" onAttach={this.setup}>
      <div class="max-w-4xl mx-auto bg-[#F1F1F1] pb-4 min-h-screen shadow-lg">
        <div class="bg-[#2D2829] flex text-xl sticky top-0 shadow-lg flex-col z-10">
          <div class="flex w-full p-4">
            <div class="relative">
              <div class="flex items-center">
                <div class="nf nf-fa-bars text-[#FA3973C2]"></div>
                <div class="w-24 bg-cover absolute ml-7 h-8" style="background-image: url(&quot;https://i.imgur.com/jfy49cJ.png&quot;);background-position: 0 -14px;"></div>
              </div>
            </div>
            <div class="flex-1"></div>
            <div class="flex gap-4">
              <div class="nf nf-fa-home text-[#FA3973C2]"></div>
              <div class="nf text-[#FA3973C2] nf-md-magnify"></div>
            </div>
          </div>
          <div class="p-3 flex gap-4 text-xs justify-center bg-white">
            <a class="px-3 py-1 rounded-full bg-[#FFA1C3] text-white" href="home">Recommended</a>
            <a class="px-3 py-1 rounded-full text-[#A7A7A7]" href="collection">Collection</a>
            <a class="px-3 py-1 rounded-full text-[#A7A7A7]" href="my-oc">My OC</a>
            <a class="px-3 py-1 rounded-full text-[#A7A7A7]" href="gallery">Gallery</a>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 gap-4 section:gallery"></div>
      </div>
    </div>
  );

  renderGallery = () => d.map(() => this.gallery, x => (
    <div
      class="aspect-square bg-cover bg-center relative bg-[#CBCBCB]"
      style={{ backgroundImage: () => `url(${x.url})` }}
    >
      <div class="absolute right-1 bottom-1 nf nf-oct-heart"></div>
    </div>
  ));
}

export default Home;
