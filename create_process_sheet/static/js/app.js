const button = document.getElementById('button');
const text = document.getElementById('text');

button.addEventListener('click', async () => {
  text.textContent = await window.myAPI.openDialog();
});


//idが「addbutton」の要素を取得
let addbutton = document.getElementById("addbutton");

//ボタンをクリックしたときに実行(イベントリスナー使用：ie9は以上で動作)
addbutton.addEventListener("click", function(){

 //idが「boxes」の要素を取得
 let boxes = document.getElementById("boxes");

 //「boxes」の要素の先頭にある子要素を複製（コピー）
 let clone = boxes.firstElementChild.cloneNode(true);

 //「boxes」の要素の最後尾に複製した要素を追加
 boxes.appendChild(clone); 
});
