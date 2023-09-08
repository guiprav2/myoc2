import d from '@dominant/core';
import qs from 'qs';

class Home {
  setup = () => {
    this.loadData();
  };

  async loadData() {
    this.ocid = qs.parse(location.search.slice(1)).id;
    let res = await fetch(`https://protohub.guiprav.com/myoc/oc?_id=${this.ocid}`);
    let data = await res.json();
    if (!data || !data.length) { alert('Failed to load'); return }
    this.data = data[0];
    console.log(this.data);
    let res2 = await fetch(`https://protohub.guiprav.com/myoc/works?ocid=${this.ocid}`);
    let data2 = await res2.json();
    if (data2 && data2.length) { this.works = data2 }
    console.log(this.works);
    d.update();
  }

  render = () => this.root = (
    <div class="flow-root h-screen overflow-auto sans text-[#2D2829] bg-neutral-200" onAttach={this.setup}>
        <div class="max-w-4xl mx-auto bg-[#F1F1F1] pb-4 min-h-screen shadow-lg">
            <div class="bg-[#2D2829] flex p-4 text-xl items-center sticky top-0 shadow-lg">
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
            <div class="text-center">
                <div class="text-[#FA3973C2] text-xl mt-2">
                    {d.text(() => this.data?.name)}
                </div>
            </div>
            <div class="text-center">
                <img class="mx-auto rounded-full bg-[#CBCBCB] w-32 h-32 my-4" src={() => this.data?.url} />
            </div>
            <div>
                <div class="mx-8 border-b border-[#E3D9D9BD] py-1">
                    History
                </div>
            </div>
            <div>
                <div class="px-12 py-4 text-sm">
                    Text...
                </div>
            </div>
            <div class="text-center">
                <div class="nf nf-fa-chevron_down text-[#FA3973] text-sm mb-8 mt-2"></div>
            </div>
            <div class="bg-[#FFA1C3]">
                <div class="text-[#EAEAEA] px-8 py-1">
                    Biographical Information
                </div>
            </div>
            <div class="px-8 py-3 flex flex-col gap-4 text-sm">
                <div class="flex items-center gap-3">
                    <div class="w-48">
                        Age
                    </div>
                    <div class="">
                        -
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-48">
                        Place of birth
                    </div>
                    <div class="">
                        -
                    </div>
                </div>
            </div>
            <div class="bg-[#FFA1C3]">
                <div class="text-[#EAEAEA] px-8 py-1">
                    Physical Description
                </div>
            </div>
            <div class="px-8 py-3 flex flex-col gap-4 text-sm">
                <div class="flex items-center gap-3">
                    <div class="w-48">
                        Species
                    </div>
                    <div class="">
                        -
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-48">
                        Eye color
                    </div>
                    <div class="">
                        -
                    </div>
                </div>
            </div>
            <div class="bg-[#FFA1C3]">
                <div class="text-[#EAEAEA] px-8 py-1">
                    Gallery
                </div>
            </div>
            <div class="px-8 py-6 grid grid-cols-2 sm:grid-cols-6 gap-6">
                {d.map(() => this.works, x => (
                    <div class="aspect-square bg-[#CBCBCB] bg-cover bg-center" style={{ backgroundImage: () => `url(${x.url})` }}></div>
                ))}
                <a class="flex justify-center items-center aspect-square bg-[#CBCBCB] bg-cover bg-center" href={() => `submit-work?ocid=${this.ocid}`}>
                    <i class="nf nf-fa-plus text-[#FA3973]"></i>
                </a>
            </div>
        </div>
    </div>
  );
}

export default Home;