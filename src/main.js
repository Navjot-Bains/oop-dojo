import './style.css';

const eq=(a,b)=>{if(a!==b)throw new Error('expected '+JSON.stringify(b)+', got '+JSON.stringify(a))};
const P=[
{id:'bank',t:'BankAccount',d:'Easy',cls:['BankAccount'],
desc:'<p>A <b>BankAccount</b> holds an owner name and a balance.</p><ul class="m"><li><code>constructor(owner, balance = 0)</code>: balance defaults to 0.</li><li><code>getOwner()</code>, <code>getBalance()</code>, <code>setOwner(name)</code></li><li><code>deposit(amount)</code>: adds money; returns <code>true</code>, or <code>false</code> if amount is 0 or negative.</li><li><code>withdraw(amount)</code>: returns <code>false</code> if amount is invalid or exceeds the balance.</li><li><code>toString()</code>: <code>BankAccount[owner=Ana, balance=100.00]</code> (2 decimals).</li></ul>',
uml:'+--------------------------------+\n|          BankAccount           |\n+--------------------------------+\n| - owner: string                |\n| - balance: number              |\n+--------------------------------+\n| + constructor(owner, balance=0)|\n| + getOwner(): string           |\n| + setOwner(name): void         |\n| + getBalance(): number         |\n| + deposit(amount): boolean     |\n| + withdraw(amount): boolean    |\n| + toString(): string           |\n+--------------------------------+',
hints:['Store the fields with an underscore (this._balance) to signal they are private.','deposit and withdraw both need a guard: reject amount <= 0 first.','withdraw also checks amount > this._balance before subtracting.','Use this._balance.toFixed(2) in toString.'],
start:'class BankAccount {\n  constructor(owner, balance = 0) {\n    // TODO\n  }\n  // TODO: getOwner, setOwner, getBalance, deposit, withdraw, toString\n}\n',
sol:'class BankAccount {\n  constructor(owner, balance = 0) {\n    this._owner = owner;\n    this._balance = balance;\n  }\n  getOwner() { return this._owner; }\n  setOwner(name) { this._owner = name; }\n  getBalance() { return this._balance; }\n  deposit(amount) {\n    if (amount <= 0) return false;\n    this._balance += amount;\n    return true;\n  }\n  withdraw(amount) {\n    if (amount <= 0 || amount > this._balance) return false;\n    this._balance -= amount;\n    return true;\n  }\n  toString() {\n    return "BankAccount[owner=" + this._owner + ", balance=" + this._balance.toFixed(2) + "]";\n  }\n}\n',
tests:[
['Constructor sets owner, balance defaults to 0',(C)=>{const a=new C.BankAccount('Ana');eq(a.getOwner(),'Ana');eq(a.getBalance(),0)}],
['Constructor accepts a starting balance',(C)=>eq(new C.BankAccount('Ana',50).getBalance(),50)],
['deposit adds money and returns true',(C)=>{const a=new C.BankAccount('A',50);eq(a.deposit(25),true);eq(a.getBalance(),75)}],
['deposit rejects 0 and negative amounts',(C)=>{const a=new C.BankAccount('A',50);eq(a.deposit(0),false);eq(a.deposit(-5),false);eq(a.getBalance(),50)}],
['withdraw succeeds within balance',(C)=>{const a=new C.BankAccount('A',50);eq(a.withdraw(20),true);eq(a.getBalance(),30)}],
['withdraw fails when overdrawing',(C)=>{const a=new C.BankAccount('A',50);eq(a.withdraw(51),false);eq(a.getBalance(),50)}],
['setOwner updates the owner',(C)=>{const a=new C.BankAccount('A');a.setOwner('Bo');eq(a.getOwner(),'Bo')}],
['toString format',(C)=>eq(new C.BankAccount('Ana',100).toString(),'BankAccount[owner=Ana, balance=100.00]')]]},

{id:'house',t:'House',d:'Easy',cls:['House'],
desc:'<p>A <b>House</b> for a real estate listing.</p><ul class="m"><li><code>constructor(address, bedrooms = 1, price = 0)</code></li><li>Getters for all three fields; setters for <code>bedrooms</code> and <code>price</code>. Setters ignore negative values.</li><li><code>isLuxury()</code>: true when price is at least 1,000,000.</li><li><code>toString()</code>: <code>12 Oak St: 3 bed, $450000</code></li></ul>',
uml:'+--------------------------------------+\n|                House                 |\n+--------------------------------------+\n| - address: string                    |\n| - bedrooms: number                   |\n| - price: number                      |\n+--------------------------------------+\n| + constructor(address,bedrooms=1,    |\n|               price=0)               |\n| + getAddress(): string               |\n| + getBedrooms(): number              |\n| + setBedrooms(n): void               |\n| + getPrice(): number                 |\n| + setPrice(p): void                  |\n| + isLuxury(): boolean                |\n| + toString(): string                 |\n+--------------------------------------+',
hints:['Default parameters in the constructor handle bedrooms=1 and price=0.','A setter can validate: if (p >= 0) this._price = p;','isLuxury returns the comparison directly: return this._price >= 1000000;'],
start:'class House {\n  constructor(address, bedrooms = 1, price = 0) {\n    // TODO\n  }\n}\n',
sol:'class House {\n  constructor(address, bedrooms = 1, price = 0) {\n    this._address = address;\n    this._bedrooms = bedrooms;\n    this._price = price;\n  }\n  getAddress() { return this._address; }\n  getBedrooms() { return this._bedrooms; }\n  setBedrooms(n) { if (n >= 0) this._bedrooms = n; }\n  getPrice() { return this._price; }\n  setPrice(p) { if (p >= 0) this._price = p; }\n  isLuxury() { return this._price >= 1000000; }\n  toString() {\n    return this._address + ": " + this._bedrooms + " bed, $" + this._price;\n  }\n}\n',
tests:[
['Defaults: 1 bedroom, price 0',(C)=>{const h=new C.House('1 A St');eq(h.getBedrooms(),1);eq(h.getPrice(),0)}],
['Constructor stores all fields',(C)=>{const h=new C.House('1 A St',3,450000);eq(h.getAddress(),'1 A St');eq(h.getBedrooms(),3);eq(h.getPrice(),450000)}],
['setPrice updates a valid price',(C)=>{const h=new C.House('x');h.setPrice(5);eq(h.getPrice(),5)}],
['setPrice ignores negatives',(C)=>{const h=new C.House('x',1,10);h.setPrice(-1);eq(h.getPrice(),10)}],
['setBedrooms ignores negatives',(C)=>{const h=new C.House('x',2);h.setBedrooms(-3);eq(h.getBedrooms(),2)}],
['isLuxury at 1,000,000',(C)=>{eq(new C.House('x',1,1000000).isLuxury(),true);eq(new C.House('x',1,999999).isLuxury(),false)}],
['toString format',(C)=>eq(new C.House('12 Oak St',3,450000).toString(),'12 Oak St: 3 bed, $450000')]]},

{id:'pizza',t:'PizzaOrder',d:'Medium',cls:['PizzaOrder'],
desc:'<p>A <b>PizzaOrder</b> tracks size and toppings.</p><ul class="m"><li><code>constructor(size = "medium")</code>: starts with no toppings.</li><li><code>getSize()</code>, <code>setSize(size)</code> (only "small", "medium", "large" accepted)</li><li><code>addTopping(name)</code>: no duplicates; returns true if added.</li><li><code>getToppingCount()</code></li><li><code>getPrice()</code>: base small 8, medium 10, large 12, plus 1.50 per topping.</li><li><code>toString()</code>: <code>medium pizza (pepperoni, olives) $13.00</code>; with no toppings: <code>medium pizza (plain) $10.00</code></li></ul>',
uml:'+------------------------------------+\n|             PizzaOrder             |\n+------------------------------------+\n| - size: string                     |\n| - toppings: string[]               |\n+------------------------------------+\n| + constructor(size="medium")       |\n| + getSize(): string                |\n| + setSize(size): void              |\n| + addTopping(name): boolean        |\n| + getToppingCount(): number        |\n| + getPrice(): number               |\n| + toString(): string               |\n+------------------------------------+',
hints:['Initialize this._toppings = [] inside the constructor.','Keep the base prices in an object: {small: 8, medium: 10, large: 12}.','Use this._toppings.includes(name) to block duplicates.','Use join(", ") for the toppings list.'],
start:'class PizzaOrder {\n  constructor(size = "medium") {\n    // TODO\n  }\n}\n',
sol:'class PizzaOrder {\n  constructor(size = "medium") {\n    this._size = size;\n    this._toppings = [];\n  }\n  getSize() { return this._size; }\n  setSize(size) {\n    if (["small", "medium", "large"].includes(size)) this._size = size;\n  }\n  addTopping(name) {\n    if (this._toppings.includes(name)) return false;\n    this._toppings.push(name);\n    return true;\n  }\n  getToppingCount() { return this._toppings.length; }\n  getPrice() {\n    const base = { small: 8, medium: 10, large: 12 };\n    return base[this._size] + 1.5 * this._toppings.length;\n  }\n  toString() {\n    const t = this._toppings.length ? this._toppings.join(", ") : "plain";\n    return this._size + " pizza (" + t + ") $" + this.getPrice().toFixed(2);\n  }\n}\n',
tests:[
['Default size is medium with 0 toppings',(C)=>{const p=new C.PizzaOrder();eq(p.getSize(),'medium');eq(p.getToppingCount(),0)}],
['Base prices by size',(C)=>{eq(new C.PizzaOrder('small').getPrice(),8);eq(new C.PizzaOrder('medium').getPrice(),10);eq(new C.PizzaOrder('large').getPrice(),12)}],
['addTopping adds and blocks duplicates',(C)=>{const p=new C.PizzaOrder();eq(p.addTopping('olives'),true);eq(p.addTopping('olives'),false);eq(p.getToppingCount(),1)}],
['Each topping costs 1.50',(C)=>{const p=new C.PizzaOrder('large');p.addTopping('a');p.addTopping('b');eq(p.getPrice(),15)}],
['setSize rejects unknown sizes',(C)=>{const p=new C.PizzaOrder();p.setSize('huge');eq(p.getSize(),'medium');p.setSize('small');eq(p.getSize(),'small')}],
['toString with toppings',(C)=>{const p=new C.PizzaOrder();p.addTopping('pepperoni');p.addTopping('olives');eq(p.toString(),'medium pizza (pepperoni, olives) $13.00')}],
['toString with no toppings',(C)=>eq(new C.PizzaOrder().toString(),'medium pizza (plain) $10.00')]]},

{id:'lib',t:'Library',d:'Hard',cls:['Book','Library'],
desc:'<p>Two classes that work together (composition: a Library <i>has</i> Books).</p><p><b>Book</b></p><ul class="m"><li><code>constructor(title, author)</code>: new books are available.</li><li><code>getTitle()</code>, <code>getAuthor()</code>, <code>isAvailable()</code></li><li><code>checkOut()</code>: returns false if already out, else marks it out and returns true.</li><li><code>returnBook()</code>: marks it available.</li><li><code>toString()</code>: <code>Dune by Frank Herbert</code></li></ul><p><b>Library</b></p><ul class="m"><li><code>constructor()</code>: starts empty.</li><li><code>addBook(book)</code>, <code>findByTitle(title)</code> (returns the Book or <code>null</code>)</li><li><code>checkOut(title)</code>: true only if the book exists and was available.</li><li><code>getAvailableCount()</code></li><li><code>toString()</code>: <code>Library[books=2, available=1]</code></li></ul>',
uml:'+---------------------------+      +--------------------------+\n|          Book             |      |         Library          |\n+---------------------------+      +--------------------------+\n| - title: string           |      | - books: Book[]          |\n| - author: string          | 0..* +--------------------------+\n| - available: boolean      |<>----| + addBook(book): void    |\n+---------------------------+      | + findByTitle(t): Book    |\n| + getTitle(): string      |      | + checkOut(t): boolean   |\n| + getAuthor(): string     |      | + getAvailableCount()    |\n| + isAvailable(): boolean  |      | + toString(): string     |\n| + checkOut(): boolean     |      +--------------------------+\n| + returnBook(): void      |\n| + toString(): string      |\n+---------------------------+',
hints:['Library holds an array of Book objects: this._books = [].','Library.checkOut should reuse findByTitle and Book.checkOut instead of duplicating logic.','getAvailableCount: this._books.filter(b => b.isAvailable()).length','Guard against findByTitle returning null before calling methods on it.'],
start:'class Book {\n  constructor(title, author) {\n    // TODO\n  }\n}\n\nclass Library {\n  constructor() {\n    // TODO\n  }\n}\n',
sol:'class Book {\n  constructor(title, author) {\n    this._title = title;\n    this._author = author;\n    this._available = true;\n  }\n  getTitle() { return this._title; }\n  getAuthor() { return this._author; }\n  isAvailable() { return this._available; }\n  checkOut() {\n    if (!this._available) return false;\n    this._available = false;\n    return true;\n  }\n  returnBook() { this._available = true; }\n  toString() { return this._title + " by " + this._author; }\n}\n\nclass Library {\n  constructor() { this._books = []; }\n  addBook(book) { this._books.push(book); }\n  findByTitle(title) {\n    return this._books.find(b => b.getTitle() === title) || null;\n  }\n  checkOut(title) {\n    const b = this.findByTitle(title);\n    return b ? b.checkOut() : false;\n  }\n  getAvailableCount() {\n    return this._books.filter(b => b.isAvailable()).length;\n  }\n  toString() {\n    return "Library[books=" + this._books.length + ", available=" + this.getAvailableCount() + "]";\n  }\n}\n',
tests:[
['Book starts available',(C)=>{const b=new C.Book('Dune','Frank Herbert');eq(b.isAvailable(),true);eq(b.getTitle(),'Dune');eq(b.getAuthor(),'Frank Herbert')}],
['Book.checkOut then returnBook',(C)=>{const b=new C.Book('D','F');eq(b.checkOut(),true);eq(b.checkOut(),false);b.returnBook();eq(b.isAvailable(),true)}],
['Book.toString',(C)=>eq(new C.Book('Dune','Frank Herbert').toString(),'Dune by Frank Herbert')],
['Library starts empty',(C)=>eq(new C.Library().toString(),'Library[books=0, available=0]')],
['findByTitle returns Book or null',(C)=>{const l=new C.Library();const b=new C.Book('A','x');l.addBook(b);eq(l.findByTitle('A'),b);eq(l.findByTitle('Z'),null)}],
['Library.checkOut works once, fails for missing',(C)=>{const l=new C.Library();l.addBook(new C.Book('A','x'));eq(l.checkOut('A'),true);eq(l.checkOut('A'),false);eq(l.checkOut('Z'),false)}],
['Library.toString counts available',(C)=>{const l=new C.Library();l.addBook(new C.Book('A','x'));l.addBook(new C.Book('B','y'));l.checkOut('A');eq(l.toString(),'Library[books=2, available=1]')}]]}
];
const L=[
{n:'Classes and objects',t:'A class is a blueprint; an object is one instance built from it. The constructor sets the starting state.',c:'class Dog {\n  constructor(name) { this.name = name; }\n  bark() { return this.name + " says woof"; }\n}\nconst d = new Dog("Rex");'},
{n:'Encapsulation',t:'Keep fields private and expose them through getters and setters so the class can validate changes and protect its own state.',c:'class Account {\n  constructor() { this._balance = 0; }\n  getBalance() { return this._balance; }\n  deposit(x) { if (x > 0) this._balance += x; }\n}'},
{n:'Inheritance',t:'A subclass reuses and extends a parent class. Use it for "is-a" relationships: a SavingsAccount is an Account.',c:'class Animal { speak() { return "..."; } }\nclass Cat extends Animal {\n  speak() { return "meow"; }\n}'},
{n:'Polymorphism',t:'Different classes respond to the same method call in their own way, so code can work with the parent type without knowing the subclass.',c:'const pets = [new Animal(), new Cat()];\npets.forEach(p => console.log(p.speak()));'},
{n:'Composition',t:'Build objects out of other objects ("has-a"). A Library has Books. Prefer composition when inheritance would be forced.',c:'class Library {\n  constructor() { this._books = []; }\n  addBook(b) { this._books.push(b); }\n}'}
];
let S={solved:{},learned:{},code:{}};
try{Object.assign(S,JSON.parse(localStorage.getItem('oopdojo')||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem('oopdojo',JSON.stringify(S))}catch(e){}};
let view='dash',cur='bank',revealed={},last=null;
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{view=b.dataset.v;render()});
function go(v,id){view=v;if(id)cur=id;render()}
function render(){
 document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===view));
 ({dash,learn,prac})[view]();window.scrollTo(0,0)}
function dash(){
 const ns=P.filter(p=>S.solved[p.id]).length,nl=L.filter(c=>S.learned[c.n]).length;
 const pct=(a,b)=>Math.round(a/b*100);
 const diff=['Easy','Medium','Hard'].map(d=>{const a=P.filter(p=>p.d===d),s=a.filter(p=>S.solved[p.id]).length;return '<div class="row"><span class="tag '+d+'">'+d+'</span><span class="sp"></span><span>'+s+' / '+a.length+'</span></div>'}).join('');
 app.innerHTML='<h2>Your progress</h2><div class="stats"><div class="card"><div class="big">'+ns+'/'+P.length+'</div>problems solved<div class="bar"><i style="width:'+pct(ns,P.length)+'%"></i></div></div><div class="card"><div class="big">'+nl+'/'+L.length+'</div>concepts learned<div class="bar"><i style="width:'+pct(nl,L.length)+'%"></i></div></div><div class="card"><h3>By difficulty</h3>'+diff+'</div></div>'+
 '<div class="card"><h3>Problems</h3>'+P.map(p=>'<div class="row"><span>'+(S.solved[p.id]?'✔':'○')+'</span><b>'+p.t+'</b><span class="tag '+p.d+'">'+p.d+'</span><span class="sp"></span><button class="btn alt" data-p="'+p.id+'">'+(S.solved[p.id]?'Review':'Start')+'</button></div>').join('')+'</div>'+
 '<button class="btn alt" id="rs">Reset progress</button>';
 app.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>go('prac',b.dataset.p));
 $('#rs').onclick=()=>{if(confirm('Clear all progress and saved code?')){S={solved:{},learned:{},code:{}};save();render()}}}
function learn(){
 app.innerHTML='<h2>Learn OOP</h2>'+L.map((c,i)=>'<div class="card"><h3>'+c.n+'</h3><p>'+c.t+'</p><pre>'+esc(c.c)+'</pre><button class="btn'+(S.learned[c.n]?' alt':'')+'" data-i="'+i+'">'+(S.learned[c.n]?'✔ Learned':'Mark as learned')+'</button></div>').join('');
 app.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const n=L[b.dataset.i].n;S.learned[n]=!S.learned[n];save();learn()})}
function prac(){
 const p=P.find(x=>x.id===cur);
 app.innerHTML='<div class="pl">'+P.map(q=>'<button data-id="'+q.id+'" class="'+(q.id===cur?'on':'')+'">'+(S.solved[q.id]?'✔ ':'')+q.t+'</button>').join('')+'</div>'+
 '<div class="lay"><div><div class="card"><h2>'+p.t+' <span class="tag '+p.d+'">'+p.d+'</span></h2>'+p.desc+'<h3>UML</h3><pre class="uml">'+esc(p.uml)+'</pre>'+
 '<h3>Hints</h3>'+p.hints.map((h,i)=>'<details><summary>Hint '+(i+1)+'</summary>'+h+'</details>').join('')+
 '<h3>Solution</h3><div id="sol">'+(revealed[p.id]?'<pre>'+esc(p.sol)+'</pre>':'<button class="btn alt" id="rv">Reveal solution</button>')+'</div></div></div>'+
 '<div><div class="card"><textarea id="ed" spellcheck="false" aria-label="Code editor"></textarea><div class="row"><button class="btn" id="run">Run tests</button><button class="btn alt" id="rst">Reset code</button><span class="sp"></span><span class="tag">JavaScript · Ctrl+Enter</span></div><div id="out"></div></div></div></div>';
 const ed=$('#ed');ed.value=S.code[p.id]||p.start;
 ed.oninput=()=>{S.code[p.id]=ed.value;save()};
 ed.onkeydown=e=>{if(e.key==='Tab'){e.preventDefault();const s=ed.selectionStart;ed.setRangeText('  ',s,ed.selectionEnd,'end')}if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();run(p)}};
 $('#run').onclick=()=>run(p);
 $('#rst').onclick=()=>{ed.value=p.start;S.code[p.id]=p.start;save();$('#out').innerHTML=''};
 const rv=$('#rv');if(rv)rv.onclick=()=>{revealed[p.id]=1;prac()};
 app.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{cur=b.dataset.id;prac()});
 window.scrollTo(0,0)}
function run(p){
 const code=$('#ed').value,out=$('#out');let C;
 try{C=new Function(code+';return {'+p.cls.map(c=>c+':typeof '+c+'!=="undefined"?'+c+':undefined').join(',')+'}')()}
 catch(e){out.innerHTML='<div class="res f">Error: '+esc(String(e.message))+'</div>';return}
 const miss=p.cls.filter(c=>!C[c]);
 if(miss.length){out.innerHTML='<div class="res f">Missing class: '+miss.join(', ')+'</div>';return}
 let ok=0;const rows=p.tests.map(([n,f])=>{try{f(C,eq);ok++;return '<div class="res p">✔ '+esc(n)+'</div>'}catch(e){return '<div class="res f">✘ '+esc(n)+'<small>'+esc(String(e.message))+'</small></div>'}});
 const all=ok===p.tests.length;
 if(all){S.solved[p.id]=true;save()}
 out.innerHTML='<h3>'+ok+' / '+p.tests.length+' tests passed'+(all?' 🎉':'')+'</h3>'+rows.join('')}
render();
