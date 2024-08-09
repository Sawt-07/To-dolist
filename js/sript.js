'use strict'


document.addEventListener('DOMContentLoaded', () => {
    const listForm = document.querySelector('#list-form');
    const listInput = document.querySelector('#list-input');
    const listUl = document.querySelector('.list-conten');

    listForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (listInput.value !== '') {
            addList(listInput.value, false);
            listInput.value = '';

        }
    })
    // เพิ่มข้อมูลเข้า locallstorage----------------------------------------------------------
    const addList = (value, status) => {

        let items = JSON.parse(localStorage.getItem('item')) || [];

        items.push({ text: value, status: status });

        localStorage.setItem('item', JSON.stringify(items));
        console.log(localStorage.getItem('item'))
        window.location.reload();
    }
    let testlist = JSON.parse(localStorage.getItem('item')) || [];
    console.log(testlist);

    //นำข้อมูลใน locallstorage มาแสดงในelement------------------------------------------------------
    const getList = () => {

        let list = JSON.parse(localStorage.getItem('item')) || [];

        list.forEach(item => {
            const li = document.createElement('li');
            const delet = document.createElement('button');
            const para = document.createElement('p');
            const div = document.createElement('div');
            const i = document.createElement('i')
            // const edit = document.createElement('button');

            //checkbox--------------------------------------------------
            div.classList.add('checklist')
            div.addEventListener('click', () => {
                div.classList.toggle('compleet')
                if (div.classList.contains('compleet')) {
                    para.classList.add('line-text')
                } else {
                    para.classList.remove('line-text');
                }
            });
            // li.addEventListener('click', () => {
            //     div.classList.toggle('compleet')
            //     if (div.classList.contains('compleet')) {
            //         para.classList.add('line-text')
            //     } else {
            //         para.classList.remove('line-text');
            //         div.classList.remove('compleet')
            //     }
            // })
            //tage p -----------------------------------------------------------
            para.innerHTML = item.text
            para.classList.add('text-list');
            //editButton-------------------------------------------------------
            // edit.textContent = 'edit';
            // edit.classList.add('edit-btn');
            // edit.addEventListener('click', () => {

            //     editlist(item.text);
            // })
            //deletButton-------------------------------------------------------
            i.classList.add('fa-solid');
            i.classList.add('fa-trash');

            delet.classList.add('delet-btn');
            delet.addEventListener('click', (e) => {
                e.stopPropagation();
                removeList(item.text);
                li.remove();
            })

            //add element to li and add li to ul-------------------------------------
            delet.appendChild(i);
            li.appendChild(div);
            li.appendChild(para);
            // li.appendChild(edit);
            li.appendChild(delet);
            listUl.appendChild(li);

        })





    }
    //แก้ไขรายการ-------------------------------------------------------------------
    // const editlist = (i) => {

    //     listInput.value = i;

    //     const btnedit = document.querySelector('.add-btn');
    //     btnedit.addEventListener('click', () => {
    //         let list = JSON.parse(localStorage.getItem('item')) || [];

    //         const items = list.map(item => item.text === i ? { i } : item);
    //         // if(listInput.value === ''){

    //         // }
    //         console.log(items)
    //         localStorage.setItem('item', JSON.stringify(items));
    //     })
    // }
    //ลบข้อมูล
    const removeList = (text) => {
        let list = JSON.parse(localStorage.getItem('item')) || [];

        list = list.filter(items => items.text !== text);
        localStorage.setItem('item', JSON.stringify(list));
    }


    getList();
    // localStorage.clear();

})

