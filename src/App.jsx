import React, { useState, useRef } from "react";
import { Switch , Pagination } from "antd";
import { StarOutlined, ShoppingCartOutlined, StarTwoTone } from '@ant-design/icons';
import "./App.css";

export const App = () => {
  
  const productList = [
  
    {
      id: 1,
      title: "Iphone 15",
      category:"Electronic",
      price: 25000,
      stock: 30
    },
    {
      id: 2,
      title: "Saat",
      category:"Electronic",
      price: 250,
      stock: 20
 
    },
    {
      id: 3,
      title: "Ayakkabı",
      category:"Tekstil",
      price: 300,
      stock: 40
 
    },
    {
      id: 4,
      title: "Tshort",
      category:"Tekstil",
      price: 250,
      stock: 12,
 
    },
    {
      id: 5,
      title: "Top",
      category:"Spors",
      price: 100,
      stock: 5
    },
    {
      id: 6,
      title: "Bot",
      category:"Spors",
      price: 350,
      stock: 15
    },
    {
      id: 7,
      title: "Bilgisayar",
      category:"Electronic",
      price: 40000,
      stock: 50,
 
    },
    {
      id: 8,
      title: "Pantolon",
      category:"Tekstil",
      price: 350,
      stock: 15
    },
    {
      id: 9,
      title: "Gözluk",
      category:"Spors",
      price: 300,
      stock: 5
 
    },
    {
      id: 10,
      title: "Iphone 12",
      category:"Electronic",
      price: 30000,
      stock: 30
    },
    
  ];
  const [productLists, setProductLists] = useState(productList);
  const [category, setCategories] = useState("all");
  const [isDrawer, setIsDrawer] = useState(false);
  const [basket, setBasket] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [admin, setadminpanel] = useState(false);

// ---------- chatgbt 
  function addAdminPanel (e) {
    e.preventDefault()
    const form = new FormData(e.target)
    form.append("id", Date.now())
    setProductLists([...productLists , Object.fromEntries(form)])
    console.log(Object.fromEntries(form));
    console.log(productLists);
  }

const filterCategorys = productLists.filter( x =>  {
  if(category === "all") return x
  return x.category === category
  }
)

let renderProducts = filterCategorys.map(x => {
  return(
    <li className="listItem" key={x.id}>
     <h4 className="title"><strong>Ürünler: </strong>{x.title}</h4>
     <span className="category"><strong>Kategorileri: </strong>{x.category}</span>
     <span className="price"> <strong> Fiyatlar: </strong>{x.price}$</span>
     <span className="stock"><strong>STOK: </strong>{x.stock}</span>
     <button className="Store-click" onClick={() => {addToBasket(x), handleTotal()}}>Sepet Ekle</button>
     <button className={admin ? "admin-delete": "admin-delete deactive"} id={x.id} onClick={listItemRemove}>X</button>
    </li>
  )
})

//  Search

const handleSearch = (e) => {
  const searchInputValue = e.target.value
  setSearchInput(searchInputValue)

  const filterProducts = productList.filter((product) => 
  product.title.toLowerCase().includes(searchInputValue.toLowerCase())
  );
  if(searchInputValue === "") {
    console.log(productList);
  }
  setProductLists(filterProducts)
  console.log(filterProducts);
}

// admin panel Dell--
function listItemRemove(e) {
  const filterRemoveItem = productLists.filter((product) => product.id != e.target.id) 
  setProductLists(filterRemoveItem)
}

// stock Control + -

function addToBasket(product) {
  if(product.stock > 0 ) {
    setBasket([...basket, product]) 
    product.stock -= 1
    setProductLists([...productLists])
  } else {
    console.log(product.stock);
  }
}

function basketStock(id) {
  console.log(id);
  productLists.map(x =>  {
  if( x.id == id){
      x.stock += 1
      setProductLists([...productLists])
    }
  })
}

// basketTotal Control--

function handleTotal() {
  let totalprice = 0
  basket.forEach(x => {
   totalprice += Number(x.price)
  })
  return totalprice 
}

// all delete--

function removeBasketAll() {
  setBasket([])
  basket.forEach( x=> {
    x.stock += 1
    setCategories("all")
  })

}
//  Manuel Delete
  const removeBasket = (product) => {
    const updateBasket = basket.filter((x ,productItem ) => productItem !== product)
    setBasket(updateBasket)
  }

  const oneCategories = [];
  productList.forEach(products => {
  if(oneCategories.includes(products.category)) return
  oneCategories.push(products.category)
  })
  // includes icinde varmı diye bakıyor

  function showAllProducts() {
    setCategories("all");    
  }
  // all olarak geliyor sadece  onclick ile  hepsini tekrar getirdim
 
  function changeCategories(e) {
  setCategories(e.target.innerText)
  }

  const renderCategory = oneCategories.map(x => {
    return <li key={x} onClick={changeCategories}>{x}</li>
  })
// sepet ac kapat true false 

  function handleBasket() {
    setIsDrawer(!isDrawer)
  }

  function adminPanel() {
    setadminpanel(!admin)
  }
  
 return (
  <div className="container">
    <div className="mid-section">
    <h1 className="pageTitle">Products</h1>

    <div className="renderPage" style={{display: "flex", gap:"1em", justifyContent: "center"}}>
     <li key={"all"} onClick={showAllProducts}>All</li> {renderCategory} 
     <ShoppingCartOutlined className="basKet" onClick={handleBasket}/>
     
      <Switch onClick={() => adminPanel()}/>
    </div>

    <input className="checkinput" placeholder="Search" onChange={handleSearch}/>

    <ul className="list">{renderProducts}</ul>

    <Pagination className="change-list" defaultCurrent={1} total={50} />

    </div>
    
    <div className={isDrawer ? "sepet active": "sepet" }>
      <button className="closeBtn" onClick={handleBasket}>x</button>
    
      <div className="basket-seciton">
        <ul>
          <li>Satın Alıncak Ürünler</li>
        </ul>

        <ul className="basket-sepet">
          {basket.map((x, product) =>(
            <li key={product}>
             <span className="basket-title">ÜrünAdı: {x.title}</span>
             <span className="basket-category"> Kategori: {x.category}</span>
             <span className="basket-price">Price: {x.price}</span>
             <button id ={x.id} className="onedelete-basket" onClick={(e) => {removeBasket(product),basketStock(e.target.id) }}>❌</button>
            </li>
          ))}
        </ul>
        
        <ul className="total-basket">
              <span>Toplam: {handleTotal()} </span>
        </ul>
      </div>

      <button className="basket-remove" onClick={() => removeBasketAll()}>Tümünü Sil</button>
    </div>

    <div className= {admin ? "admin-panel active": "admin-panel"}>
      <div className="admin-text">
            Admin Panel
            <form onSubmit={addAdminPanel} action="">
                <input type="text" name="title" placeholder="Ürünadı"/>
                <input  type="text" name="price" placeholder="Fiyat" />
                <input type="text" name="stock" placeholder="Stok" />
                <select name="category">
                <option value="Kategoriler">All</option>
                <option value="Tekstil">Teksil</option>
                <option value="Electronic">Electronic</option>
                <option value="Spors">Spors</option>
               </select>
                <button>Ekle</button>
            </form>
      </div>
    
    </div>
  </div>
 ) 
}
