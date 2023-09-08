import d from '@dominant/core';
import qs from 'qs';

class SubmitWork {
  setup = () => {
    this.ocid = qs.parse(location.search.slice(1)).ocid;
    this.root.addEventListener('click', ev => {
      let actionName = [...ev.target.classList].find(x => x.startsWith('action:'))?.slice?.('action:'.length);
      actionName && this.actions[actionName]?.();
    });
  };

  actions = {
    submit: async () => {
      let title = this.root.querySelector('[name="title"]').value;
      let description = this.root.querySelector('[name="description"]').value;
      let tags = this.root.querySelector('[name="tags"]').value;
      this.root.querySelector('.error-msg').classList.add('hidden');

      if (!this.ocid || !this.url || !title || !description) {
        this.root.querySelector('.error-msg').classList.remove('hidden');
        return;
      }

      let data = { ocid: this.ocid, url: this.url, title, description, tags };

      let res = await fetch('https://protohub.guiprav.com/myoc/works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let resData = await res.json();
      location.href = `/oc?id=${this.ocid}`;
    },
  };

  uploadImage = async () => {
    this.url = await uploadImage();
    d.update();
  };

  render = () => this.root = (
    <div class="flow-root h-screen overflow-auto sans text-[#2D2829] bg-neutral-200" onAttach={this.setup}>
        <div class="max-w-4xl mx-auto bg-[#F1F1F1] pb-4 min-h-screen shadow-lg">
            <div class="bg-[#2D2829] flex text-xl sticky top-0 shadow-lg flex-col z-10">
                <div class="flex w-full p-4">
                    <div class="relative">
                        <div class="flex items-center">
                            <a class="nf text-[#FA3973C2] nf-fa-arrow_left" href={() => `oc?id=${this.ocid}`}></a>
                            <div class="w-24 bg-cover absolute ml-7 h-8" style="background-image: url(&quot;https://i.imgur.com/jfy49cJ.png&quot;);background-position: 0 -14px;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-10 flex flex-col items-center text-[#A7A7A7]">
                <div class="w-screen max-w-lg">
                    <div
                        class="aspect-square bg-white flex justify-center items-center bg-cover bg-center"
                        style={{ backgroundImage: () => this.url && `url(${this.url})` }}
                        onClick={this.uploadImage}
                    >
                        {d.if(() => !this.url, <div class="nf nf-fa-plus text-[#FFA1C3] text-3xl"></div>)}
                    </div>
                    <div class="flex justify-end py-3 mb-4">
                        <div class="nf nf-fa-trash text-[#FFA1C3] text-xl"></div>
                    </div>
                    <div class="flex flex-col gap-8">
                        <div class="flex flex-col">
                            <div class="text-[#FA3973]">
                                Title
                            </div>
                            <input class="bg-transparent px-3 py-2 border-b border-#A7A7A7[] outline-none" name="title" />
                        </div>
                        <div class="flex flex-col">
                            <div class="text-[#FA3973]">
                                Description
                            </div>
                            <input class="bg-transparent px-3 py-2 border-b border-#A7A7A7[] outline-none" name="description" />
                        </div>
                        <div class="flex flex-col">
                            <div class="text-[#FA3973]">
                                Tags
                            </div>
                            <input class="bg-transparent px-3 py-2 border-b border-#A7A7A7[] outline-none" name="tags" />
                        </div>
                        <div class="flex flex-col">
                            <div class="text-[#FA3973] mb-2">
                                Sexual content?
                            </div>
                            <div class="flex items-center gap-3 text-sm px-3 py-2">
                                <div class="w-4 h-4 rounded-full border-2 border-[#FA3973]"></div>
                                <div class="">
                                    None
                                </div>
                            </div>
                            <div class="flex items-center gap-3 text-sm px-3 py-2">
                                <div class="w-4 h-4 rounded-full border-2 border-[#FA3973]"></div>
                                <div class="">
                                    Yes
                                </div>
                            </div>
                        </div>
                        <div class="hidden text-red-500 italic error-msg">
                            Image, title and description are mandatory fields.
                        </div>
                        <button class="py-4 bg-[#FFA1C3] text-white action:submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

function uploadImage() {
    let input = d.el('input', { class: 'hidden', type: 'file', accept: 'image/*' });
    document.body.append(input);
    input.click();
    input.remove();
    return new Promise(res => {
        input.addEventListener('change', async () => {
            let file = input.files[0];
            let fdata = new FormData();
            fdata.append('file', file);
            let resp = await fetch('https://filet.guiprav.com/myoc/upload', {
                method: 'POST',
                body: fdata,
            });
            let data = await resp.json();
            res(data.url);
        });
    });
}

export default SubmitWork;