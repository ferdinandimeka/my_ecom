import { Container } from 'react-bootstrap';
import './App.css';
import Headers from './components/Headers';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductListScreen from './screens/ProductListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';


function App() {
  return (
    <div className="App">
      <Headers />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path="/profile" element={<ProfileScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} exact />
            <Route path="/cart/:id?" element={<CartScreen />} exact />
            <Route path="/login/shipping" element={<ShippingScreen />} exact />
            <Route path="/payment" element={<PaymentScreen />} exact />
            <Route path="/placeorder" element={<PlaceOrderScreen />} exact />
            <Route path="/order/:id" element={<OrderScreen />} exact />
            <Route path="/orderlist" element={<OrderListScreen />} exact />
            <Route path="/productlist" element={<ProductListScreen />} exact />
            <Route path="/userlist" element={<UserListScreen />} exact />
            <Route path="/user/:id/edit" element={<UserEditScreen />} exact />
            <Route path="/product/:id/edit" element={<ProductEditScreen />} exact />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
