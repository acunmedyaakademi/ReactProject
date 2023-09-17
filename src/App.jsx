import { useState } from "react";
import "./App.css";

export const App = () => {
  const [products, setProducts] = useState();
  const [category, setCategories] = useState("all");
  const [isDrawer, setIsDrawer] = useState(false);
  const [basket, setBasket] = useState([]);
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
 
const filterCategorys = productList.filter( x =>  {
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
     <button className="Store-click" onClick={() => addToBasket(x)}>Sepet Ekle</button>

    </li>
  )
})

function addToBasket(product) {
  setBasket([... basket, product]) 
}

function removeBasketAll() {
  setBasket([])
}
// all delete--

const removeBasket = (index) => {
  const updateBasket = basket.filter((i ,itemIndex ) => itemIndex !== index)
  setBasket(updateBasket)
}
// Delete sepet--

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

  function handleBasket() {
    setIsDrawer(!isDrawer)
  }


 return (
  <div className="container">
    <div className="mid-section">
    <h1 className="pageTitle">Products</h1>

    <div className="renderPage" style={{display: "flex", gap:"1em", justifyContent: "center"}}>
     <li key={"all"} onClick={showAllProducts}>All</li> {renderCategory} 

      <button className="basKet" onClick={handleBasket}>Sepet </button>
    </div>
    <ul className="list">{renderProducts}</ul>
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
             <span className="basket-stock">Stok: {x.stock}</span>
             <p className="onedelete-basket" onClick={() => removeBasket(product)}>❌</p>
            </li>
          ))}
        </ul>
        
        <ul className="total-basket">
              <span>Toplam: </span>
        </ul>
      </div>
      <button className="basket-remove" onClick={() => removeBasketAll()}>Tümünü Sil</button>
    </div>
  </div>
 )
}