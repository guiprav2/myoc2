import Menu from './Menu.jsx';
import d from '@dominant/core';

function tap(x) { console.log(x); return x }

class CreateOC {
    menu = new Menu();

    setup = () => {
    };

    toggleDotsMenu = () => { this.dotsMenuOpen = !this.dotsMenuOpen; d.update() };
    toggleAddMenu = () => { this.addMenuOpen = !this.addMenuOpen; d.update() };

    save = async () => {
        let data = {};
        for (let x of this.root.querySelectorAll('input, textarea')) {
            data[x.name] = x.value;
        }
        data.url = this.url;
        if (!data.name || !data.url) { alert('Please fill in all fields'); return }
        data.pid = JSON.parse(localStorage.getItem('user'))._id;
        let res = await fetch('https://protohub.guiprav.com/myoc/oc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        let resData = await res.json();
        if (!resData) { alert('Failed to save'); return }
        location.href = `oc?id=${resData._id}`;
    };

    delete = () => {
        if (!confirm('Are you sure?')) { return }
        location.href = 'my-oc';
    };

    uploadImage = async () => {
        this.url = await uploadImage();
        d.update();
    };

    sections = [{ type: 'bio' }];

    render = () => this.root = (
        <div class="flow-root h-screen overflow-auto sans text-[#2D2829] bg-neutral-200" onAttach={this.setup}>
            <div class="max-w-4xl mx-auto bg-[#F1F1F1] pb-4 min-h-screen shadow-lg">
                {this.menu.render()}
                <div class="bg-[#2D2829] flex p-4 text-xl items-center sticky top-0 shadow-lg">
                    <div class="relative">
                        <div class="flex items-center">
                            <a class="nf nf-fa-bars text-[#FA3973C2]" href="#" onClick={this.menu.open}></a>
                            <div class="w-24 bg-cover absolute ml-7 h-8" style="background-image: url(&quot;https://i.imgur.com/jfy49cJ.png&quot;);background-position: 0 -14px;"></div>
                        </div>
                    </div>
                    <div class="flex-1"></div>
                    <div class="flex gap-4">
                        <div class="nf nf-fa-home text-[#FA3973C2]"></div>
                        <div class="nf text-[#FA3973C2] nf-md-magnify"></div>
                    </div>
                </div>
                <div class="text-center mt-8 grid grid-cols-3 items-center">
                    <input class="text-[#FA3973C2] text-xl mt-2 text-center bg-transparent outline-none col-start-2" placeholder="OC Name" name="name" />
                    <div class="justify-self-end nf nf-md-dots_vertical w-8 h-8 flex justify-center items-center mr-4 text-neutral-400 hover:text-neutral-700 relative" onClick={this.toggleDotsMenu}>
                        <div class={() => [
                            'absolute top-[100%] right-0 sans bg-white rounded shadow-lg border border-neutral-200 hover:text-neutral-700 text-neutral-500 whitespace-nowrap mt-2',
                            this.dotsMenuOpen ? '' : 'hidden',
                        ]}>
                            <a class="block px-5 py-3 hover:bg-neutral-100" href="#" onClick={this.save}>
                                Save OC
                            </a>
                            <a class="block px-5 py-3 hover:bg-neutral-100" href="#" onClick={this.delete}>
                                Delete OC
                            </a>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <div
                        class="mx-auto rounded-full bg-[#CBCBCB] w-32 h-32 my-4 flex justify-center items-center hover:bg-neutral-400/55 bg-cover bg-center"
                        style={{ backgroundImage: () => this.url && tap(`url('${this.url}')`) }}
                        onClick={this.uploadImage}
                    >
                        {d.if(() => !this.url, <div class="nf nf-fa-plus text-[#FFA1C3]"></div>)}
                    </div>
                </div>
                <div>
                    <div class="mx-8 border-b border-[#E3D9D9BD] py-1">
                        History
                    </div>
                </div>
                <div>
                    <textarea class="px-12 py-4 text-sm w-full bg-transparent outline-none" name="story">Text...</textarea>
                </div>
                {d.map(() => this.sections, x => (
                    <>
                        {d.if(() => x.type === 'bio', (
                            <>
                                <div class="bg-[#FFA1C3] text-[#EAEAEA] px-8 py-1">
                                    Biographical Information
                                </div>
                                <div class="px-8 py-3 flex flex-col gap-4 text-sm">
                                    <div class="flex items-center gap-3">
                                        <div class="w-48">
                                            Age
                                        </div>
                                        <div class="">
                                            -&nbsp;
                                            <input class="ml-1 bg-transparent outline-none" name="age" />
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="w-48">
                                            Place of birth
                                        </div>
                                        <div class="">
                                            -&nbsp;
                                            <input class="ml-1 bg-transparent outline-none" name="placeOfBirth" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                ))}
                <div class="mx-auto w-8 h-8 nf nf-fa-plus flex justify-center items-center rounded-full bg-[#A7A7A7] text-white mt-4 relative" onClick={this.toggleAddMenu}>
                    <div class={() => [
                        'absolute left-[100%] top-[100%] w-96 bg-white border border-neutral-200 shadow-lg sans rounded overflow-hidden -ml-52 sm:ml-0 mt-4 sm:mt-0',
                        this.addMenuOpen ? '' : 'hidden',
                    ]}>
                        <div class="py-3 px-6 text-neutral-900 hover:bg-[#FFA1C3] hover:text-[#EAEAEA]">
                            Biographical information
                        </div>
                        <div class="py-3 px-6 text-neutral-900 hover:bg-[#FFA1C3] hover:text-[#EAEAEA]">
                            Physical description
                        </div>
                        <div class="py-3 px-6 text-neutral-900 hover:bg-[#FFA1C3] hover:text-[#EAEAEA]">
                            Character traits
                        </div>
                        <div class="py-3 px-6 text-neutral-900 hover:bg-[#FFA1C3] hover:text-[#EAEAEA]">
                            Relationships
                        </div>
                        <div class="py-3 px-6 text-neutral-900 hover:bg-[#FFA1C3] hover:text-[#EAEAEA]">
                            Occupation
                        </div>
                        <div class="py-3 px-6 text-neutral-900 hover:bg-[#FFA1C3] hover:text-[#EAEAEA]">
                            Powers/abilities
                        </div>
                        <div class="py-3 px-6 text-neutral-900 hover:bg-[#FFA1C3] hover:text-[#EAEAEA]">
                            Gallery
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

export default CreateOC;