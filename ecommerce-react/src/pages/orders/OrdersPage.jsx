import { Link } from "react-router";
import { Header } from "../../components/header";
import axios from "axios";
import { useState,useEffect, Fragment } from "react";
import "./OrdersPage.css";
import dayjs from "dayjs";
import { OrdersGrid } from "./OrdersGrid.jsX";


export function OrdersPage({cart}) {
  function formatMoney(cents){
    return(cents/100).toFixed(2);
  }
  const [orders, setOrders]=useState([]);
  useEffect(()=>{
     (async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    })();
  },[])
  return (
    <>
      <title>Orders</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="images/favicons/orders-favicon.png"
      />
      <Header cart={cart}/>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} formatMoney={formatMoney}/>
      </div>
    </>
  );
}
