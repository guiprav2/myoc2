import d from '@dominant/core';

class MyOC {
  ocs = [
    {
      name: 'Jess',
      avatar: 'https://imagedelivery.net/xej_GVif4nQ_9r7VDwXkpg/ef57a801-db25-47b9-fe7b-3a0691eac400/public',
      artworks: [{ url: 'https://imagedelivery.net/xej_GVif4nQ_9r7VDwXkpg/c96ef130-9c04-4b1e-a861-6c52eab85900/public' }],
      views: 0,
      faves: 0,
      comments: 0,
    },
  ];

  setup = () => {
    this.root.querySelector('.section\\:list').append(this.renderList());
  };

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
            <a class="px-3 py-1 rounded-full text-[#A7A7A7]" href="home">Recommended</a>
            <a class="px-3 py-1 rounded-full text-[#A7A7A7]" href="collection">Collection</a>
            <a class="px-3 py-1 rounded-full bg-[#FFA1C3] text-white" href="my-oc">My OC</a>
            <a class="px-3 py-1 rounded-full text-[#A7A7A7]" href="gallery">Gallery</a>
          </div>
        </div>
        <div class="section:list"></div>
      </div>
    </div>
  );

  renderList = () => d.map(() => this.ocs, x => (
    <div class="flex flex-col items-center m-10">
      <img class="rounded-full w-48" src={() => x.avatar}/>
      <div class="text-2xl text-[#FA3973] my-6">{d.text(() => x.name)}</div>
      <div class="relative px-10 max-w-xl w-screen section:gallery">
        <div class="absolute top-[50%] -translate-y-[50%] left-1 nf nf-fa-chevron_left text-[#FA3973]"></div>
        {d.map(() => x.artworks, y => <img class="w-full h-[50vh] object-cover" src={() => y.url} />)}
        <div class="absolute top-[50%] -translate-y-[50%] right-1 nf nf-fa-chevron_right text-[#FA3973]"></div>
      </div>
      <div class="px-10 w-screen max-w-xl">
        <div class="flex gap-3 items-center py-2 border-b text-[#A7A7A7] border-[#E3D9D9BD]">
          <div class="flex items-center gap-2">
            <div class="nf nf-fa-eye text-[#FFA1C3]"></div>
            <div>{d.text(() => x.views)}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="nf nf-md-heart text-[#FFA1C3]"></div>
            <div>{d.text(() => x.faves)}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="nf nf-oct-comment text-[#FFA1C3]"></div>
            <div>{d.text(() => x.comments)}</div>
          </div>
          <div class="flex-1"></div>
          <div class="nf nf-md-dots_vertical"></div>
        </div>
      </div>
    </div>
  ));
}

export default MyOC;
